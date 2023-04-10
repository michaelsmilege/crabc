package cn.crabc.core.admin.service.system.impl;

import cn.crabc.core.admin.entity.*;
import cn.crabc.core.admin.entity.dto.ApiInfoDTO;
import cn.crabc.core.admin.entity.param.ApiInfoParam;
import cn.crabc.core.admin.entity.vo.ApiComboBoxVO;
import cn.crabc.core.admin.entity.vo.ApiInfoVO;
import cn.crabc.core.admin.enums.ApiStateEnum;
import cn.crabc.core.admin.mapper.BaseApiInfoMapper;
import cn.crabc.core.admin.mapper.BaseApiParamMapper;
import cn.crabc.core.admin.mapper.BaseAppApiMapper;
import cn.crabc.core.admin.mapper.BaseAppMapper;
import cn.crabc.core.admin.service.system.IBaseApiInfoService;
import cn.crabc.core.admin.util.PageInfo;
import cn.crabc.core.admin.util.UserThreadLocal;
import cn.crabc.core.app.exception.CustomException;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * API基本信息 服务实现
 *
 * @author yuqf
 */
@Service
public class BaseApiInfoServiceImpl implements IBaseApiInfoService {

    @Autowired
    private BaseApiInfoMapper apiInfoMapper;
    @Autowired
    private BaseAppMapper baseAppMapper;
    @Autowired
    private BaseAppApiMapper baseAppApiMapper;
    @Autowired
    private BaseApiParamMapper apiParamMapper;
    @Autowired
    @Qualifier("apiCache")
    Cache<String, Object> apiInfoCache;

    @Scheduled(cron = "*/30 * * * * ?")
    public void task(){
        initApi();
    }
    @Override
    public void initApi() {
        updateCache(null);
    }

    private void updateCache(Long apiId){
        List<ApiInfoDTO> apis = this.getApiCache(apiId);
        for (ApiInfoDTO api : apis) {
            apiInfoCache.put(api.getApiMethod() + "_" + api.getApiPath(), api);
        }
    }

    @Override
    public List<ApiInfoDTO> getApiCache(Long apiId) {
        List<ApiInfoDTO> apiInfos = apiInfoMapper.selectApiDetail(apiId);
        if (apiInfos.size() == 0) {
            return apiInfos;
        }
        // 应用
        List<BaseApp> appApis = baseAppMapper.selectApiApp(apiId);
        Map<Long, List<BaseApp>> appMap = appApis.stream().collect(Collectors.groupingBy(BaseApp::getApiId));
        // 请求参数
        List<BaseApiParam> baseApiParams = apiParamMapper.selectReqParams(apiId);
        Map<Long, List<BaseApiParam>> paramMap = baseApiParams.stream().collect(Collectors.groupingBy(BaseApiParam::getApiId));
        for (ApiInfoDTO api : apiInfos) {
            Long apiIdKey = api.getApiId();
            if (appMap.containsKey(apiIdKey)) {
                api.setAppList(appMap.get(apiIdKey));
            }
            if (paramMap.containsKey(apiIdKey)){
                api.setRequestParams(paramMap.get(apiIdKey));
            }
        }
        return apiInfos;
    }

    @Override
    public PageInfo<BaseApiInfo> getApiPage(String apiName, String devType, int pageNum, int pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<BaseApiInfo> list = apiInfoMapper.selectList(apiName, devType);
        return new PageInfo<>(list, pageNum, pageSize);
    }

    @Override
    public List<BaseApiInfo> getApiList(String apiName) {
        return apiInfoMapper.selectList(apiName, null);
    }

    @Override
    public List<ApiComboBoxVO> getApiListGroup(Integer groupId) {
        return apiInfoMapper.selectApiGroup(groupId, null);
    }

    @Override
    public List<ApiComboBoxVO> getApiListUser(String userId) {
        return apiInfoMapper.selectApiGroup(null, userId);
    }

    @Override
    public Boolean checkApiPath(Long apiId, String apiPath, String method) {
        Integer count = apiInfoMapper.checkApiPath(apiId, apiPath, method);
        return count > 0 ? true : false;
    }

    @Override
    public BaseApiInfo getApiInfo(Long apiId) {
        return apiInfoMapper.selectApiById(apiId);
    }

    @Override
    public ApiInfoVO getApiDetail(Long apiId) {
        ApiInfoVO result = new ApiInfoVO();
        BaseApiInfo baseApiInfo = apiInfoMapper.selectApiById(apiId);
        BaseApiSql baseApiSql = new BaseApiSql();
        BeanUtils.copyProperties(baseApiInfo, baseApiSql);
        result.setSqlInfo(baseApiSql);
        baseApiInfo.setPageSetup(baseApiSql.getPageSetup());
        result.setBaseInfo(baseApiInfo);
        result.setQueryEngine("jdbc");
        List<BaseApiParam> baseApiParams = apiParamMapper.selectList(apiId);
        if (!baseApiParams.isEmpty()) {
            Map<String, List<BaseApiParam>> map = baseApiParams.stream().collect(Collectors.groupingBy(BaseApiParam::getParamModel));
            result.setRequestParam(map.get("request") == null ? new ArrayList<>() : map.get("request"));
            result.setResponseParam(map.get("response") == null ? new ArrayList<>() : map.get("response"));
        }
        return result;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long addApiInfo(ApiInfoParam params) {
        Date date = new Date();
        BaseApiInfo api = params.getBaseInfo();
        BaseApiSql sql = params.getSqlInfo();
        api.setApiStatus(ApiStateEnum.EDIT.getName());
        api.setEnabled(0);
        api.setApiType("SQL");
        api.setDatasourceId(sql.getDatasourceId());
        api.setSchemaName(sql.getSchemaName());
        api.setDatasourceType(sql.getDatasourceType());
        api.setSqlScript(sql.getSqlScript());
        api.setCreateTime(date);
        api.setUpdateTime(date);
        api.setCreateBy(UserThreadLocal.getUserId());
        if (api.getGroupId() == null) {
            api.setGroupId(1);
        }
        apiInfoMapper.insertApiInfo(api);
        // 参数
        this.insertApiParams(params.getRequestParam(),params.getResponseParam());
        return api.getApiId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long updateApiInfo(ApiInfoParam params) {
        Long apiId = params.getBaseInfo().getApiId();
        Integer count = apiInfoMapper.countApi(apiId);
        if (count == 0) {
            throw new CustomException(52002, "API不存在");
        }
        BaseApiInfo api = params.getBaseInfo();
        BaseApiSql sql = params.getSqlInfo();
        Date updateTime = new Date();
        api.setDatasourceId(sql.getDatasourceId());
        api.setSchemaName(sql.getSchemaName());
        api.setDatasourceType(sql.getDatasourceType());
        api.setSqlScript(sql.getSqlScript());
        api.setUpdateTime(updateTime);
        api.setUpdateBy(UserThreadLocal.getUserId());
        apiInfoMapper.updateApiInfo(api);
        apiParamMapper.delete(apiId);
        // 参数
        this.insertApiParams(params.getRequestParam(),params.getResponseParam());
        return apiId;
    }

    @Override
    public Integer updateApiState(Long apiId, String status, Integer enabled) {
        Integer count = apiInfoMapper.countApi(apiId);
        if (count == 0) {
            throw new CustomException(52002, "API不存在");
        }
        BaseApiInfo baseApiInfo = new BaseApiInfo();
        baseApiInfo.setApiId(apiId);
        baseApiInfo.setUpdateTime(new Date());
        baseApiInfo.setUpdateBy(UserThreadLocal.getUserId());
        if (status != null && !"".equals(status)) {
            baseApiInfo.setApiStatus(status);
        }
        if (enabled != null) {
            baseApiInfo.setEnabled(enabled);
        }
        // 更新缓存
        this.updateCache(apiId);
        apiInfoMapper.updateApiState(baseApiInfo);
        return 1;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Integer deleteApi(Long apiId, String userId) {
        Integer result = apiInfoMapper.deleteApiInfo(apiId, userId);
        return result;
    }

    @Override
    public Long apiPublish(ApiInfoParam apiInfoParam) {
        Long apiId = apiInfoParam.getBaseInfo().getApiId();
        BaseApiInfo oldApiInfo = apiInfoMapper.selectApiById(apiId);
        if (oldApiInfo == null) {
            throw new CustomException(52002, "API不存在");
        }
//        if (apiInfoParam.getBaseInfo().getVersion().equals(oldApiInfo.getVersion())) {
//            throw new CustomException(52003, "API版本号[" + oldApiInfo.getVersion() + "]已存在，请变更版本号");
//        }
        // 已存在发布的版本则保存一条历史数据
        if (ApiStateEnum.RELEASE.getName().equals(oldApiInfo.getApiStatus())) {
            this.insertHistory(oldApiInfo);
        }
        Date updateTime = new Date();
        BaseApiInfo baseApiInfo = apiInfoParam.getBaseInfo();
        baseApiInfo.setEnabled(1);
        baseApiInfo.setParentId(0L);
        baseApiInfo.setApiType("SQL");
        baseApiInfo.setReleaseTime(updateTime);
        baseApiInfo.setUpdateBy(UserThreadLocal.getUserId());
        baseApiInfo.setApiStatus(ApiStateEnum.RELEASE.getName());
        apiInfoMapper.updateApiInfo(baseApiInfo);
        // 更新缓存
        this.updateCache(baseApiInfo.getApiId());
        return apiId;
    }

    @Override
    public PageInfo getNotChooseApi(Long appId, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<ApiComboBoxVO> allApi = apiInfoMapper.selectApiApp(null);
        List<ApiComboBoxVO> appApis = apiInfoMapper.selectApiApp(appId);
        allApi.removeAll(appApis);
        return new PageInfo<>(allApi, pageNum, pageSize);
    }

    @Override
    public PageInfo getChooseApi(Long appId, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<ApiComboBoxVO> list = apiInfoMapper.selectApiApp(appId);
        return new PageInfo<>(list, pageNum, pageSize);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Integer addChooseApi(BaseAppApi appApi) {
        String userId = UserThreadLocal.getUserId();
        baseAppApiMapper.delete(appApi.getAppId(), userId);

        if (appApi.getApiIds() == null || appApi.getApiIds().size() == 0) {
            return 1;
        }
        Date time = new Date();
        List<BaseAppApi> list = new ArrayList<>();
        for (Long apiId : appApi.getApiIds()) {
            BaseAppApi a = new BaseAppApi();
            a.setAppId(appApi.getAppId());
            a.setApiId(apiId);
            a.setCreateBy(userId);
            a.setCreateTime(time);
            list.add(a);
        }
        return baseAppApiMapper.insert(list);
    }

    /**
     * api信息历史发布版本存档
     *
     * @param apiInfo
     */
    public void insertHistory(BaseApiInfo apiInfo) {
        Long apiId = apiInfo.getApiId();
        Date updateTime = new Date();
        apiInfo.setApiStatus(ApiStateEnum.HISTORY.getName());
        apiInfo.setParentId(apiId);
        apiInfo.setApiPath(apiInfo.getApiPath() + "/" + apiInfo.getVersion());
        apiInfo.setUpdateTime(updateTime);
        apiInfo.setApiId(null);
        apiInfoMapper.insertApiInfo(apiInfo);
    }

    /**
     * 新增API参数
     * @param requestParams
     * @param responseParams
     */
    private void insertApiParams(List<BaseApiParam> requestParams, List<BaseApiParam> responseParams){
        List<BaseApiParam> params = new ArrayList<>();
        if (requestParams != null && requestParams.size() > 0) {
            params.addAll(requestParams);
        }
        if (responseParams != null && responseParams.size() > 0) {
            params.addAll(responseParams);
        }
        if (params.size() > 0) {
            apiParamMapper.insertBatch(params);
        }
    }
}
