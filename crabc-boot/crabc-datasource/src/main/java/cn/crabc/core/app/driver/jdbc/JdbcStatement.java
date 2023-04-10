package cn.crabc.core.app.driver.jdbc;

import cn.crabc.core.app.config.JdbcDataSourceRouter;
import cn.crabc.core.app.constant.BaseConstant;
import cn.crabc.core.app.exception.CustomException;
import cn.crabc.core.app.mapper.BaseDataHandleMapper;
import cn.crabc.core.app.util.PageInfo;
import cn.crabc.core.spi.StatementMapper;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

public class JdbcStatement implements StatementMapper {
    private static Logger log = LoggerFactory.getLogger(JdbcStatement.class);
    private BaseDataHandleMapper baseMapper;
    private static final Integer PAGE_SIZE = 50;

    private static final Integer PAGE_NUM = 1;

    public JdbcStatement(BaseDataHandleMapper baseMapper) {
        this.baseMapper = baseMapper;
    }

    @Override
    public Map<String, Object> selectOne(String dataSourceId, String schema, String sql, Object params) {
        List<Map<String, Object>> maps = this.selectList(dataSourceId, schema, sql, params);
        return maps.size() > 0 ? maps.get(0) : new HashMap<>();
    }

    @Override
    public List<Map<String, Object>> selectList(String dataSourceId, String schema, String sql, Object params) {
        // 列表默认查询15条
        PageInfo page = this.selectPage(dataSourceId, schema, sql, params, PAGE_NUM, PAGE_SIZE);
        return page.getList();
    }

    @Override
    public PageInfo selectPage(String dataSourceId, String schema, String sql, Object params, int pageNum, int pageSize) {
        // 判断是否是预览运行SQL
        String execType = null;
        List<Map<String, Object>> list = new ArrayList<>();
        try {
            Map<String, Object> paramsMap = this.setParams(dataSourceId, schema, sql, params);
            if (paramsMap.containsKey(BaseConstant.BASE_API_EXEC_TYPE)) {
                execType = paramsMap.get(BaseConstant.BASE_API_EXEC_TYPE).toString();
            }
            Object pageSetup = paramsMap.get(BaseConstant.PAGE_SETUP);
            int pageCount = pageSetup != null ? Integer.parseInt(pageSetup.toString()) : 0;
            // 判断是否分页
            if (BaseConstant.PAGE_COUNT == pageCount && !checkPage(sql)) {
                PageHelper.startPage(pageNum, pageSize, true);
            } else if (!checkPage(sql)){
                PageHelper.startPage(pageNum, pageSize, false);
            }
            list = baseMapper.executeQuery(paramsMap);

        } catch (Exception e) {
            Throwable cause = e.getCause();
            log.error("--SQL执行失败，请检查SQL是否正常: {}", cause == null ? e : cause.getMessage());
            if (execType == null) {
                throw new CustomException(51000, cause == null ? e.getMessage() : cause.getMessage());
            } else {
                Map<String, Object> errorMap = new HashMap<>();
                errorMap.put("errorMsg", "SQL执行失败：" + cause == null ? e.getMessage() : cause.getMessage());
                list.add(errorMap);
            }
        } finally {
            PageHelper.clearPage();
            JdbcDataSourceRouter.remove();
        }
        return new PageInfo<>(list, pageNum, pageSize);
    }

    @Override
    public int insert(String dataSourceId, String schema, String sql, Object params) {
        Integer result;
        try {
            Map<String, Object> paramsMap = this.setParams(dataSourceId, schema, sql, params);
            result = baseMapper.executeInsert(paramsMap);
        } catch (Exception e) {
            log.error("--SQL执行失败，请检查SQL是否正常", e);
            throw new CustomException(51000, "SQL执行失败，请检查SQL是否正常");
        } finally {
            // 移除线程
            JdbcDataSourceRouter.remove();
        }
        return result;
    }

    @Override
    public int delete(String dataSourceId, String schema, String sql, Object params) {
        try {
            Map<String, Object> paramsMap = this.setParams(dataSourceId, schema, sql, params);
            Integer result = baseMapper.executeDelete(paramsMap);
        } catch (Exception e) {
            log.error("--SQL执行失败，请检查SQL是否正常", e);
            throw new CustomException(51000, "SQL执行失败，请检查SQL是否正常");
        } finally {
            // 移除线程
            JdbcDataSourceRouter.remove();
        }
        return 1;
    }

    @Override
    public int update(String dataSourceId, String schema, String sql, Object params) {
        try {
            Map<String, Object> paramsMap = this.setParams(dataSourceId, schema, sql, params);
            Integer result = baseMapper.executeUpdate(paramsMap);
        } catch (Exception e) {
            log.error("--SQL执行失败，请检查SQL是否正常", e);
            throw new CustomException(51000, "SQL执行失败，请检查SQL是否正常");
        } finally {
            // 移除线程
            JdbcDataSourceRouter.remove();
        }
        return 1;
    }


    /**
     * 设置请求参数
     *
     * @param dataSourceId
     * @param schema
     * @param sql
     * @param params
     * @return
     */
    public Map<String, Object> setParams(String dataSourceId, String schema, String sql, Object params) {
        // 设置线程数据源
        if (schema != null && !"".equals(schema)) {
            // 拼接数据源ID和schema
            dataSourceId = dataSourceId + ":" + schema;
        }
        JdbcDataSourceRouter.setDataSourceKey(dataSourceId);
        Map<String, Object> paramsMap = new HashMap<>();
        paramsMap.put(BaseConstant.BASE_SQL, sql.replaceAll(";",""));
        if (params instanceof Map) {
            Map<String, Object> map = (Map<String, Object>) params;
            paramsMap.putAll(map);
        }
        return paramsMap;
    }

    /**
     * 校验SQL是否包含分页
     * @param sql
     * @return
     */
    private boolean checkPage(String sql){
        // 匹配limit+ 数字的规则，mysql,tidb
        String mysql = "(?i)limit.*?\\d";
        // 匹配limit+ 数字的规则，postgres, sqlserver2012以上
        String postgres = "(?i)offset.*?\\d";
        // 匹配ROWNUM关键字分页，oracle
        String oracle ="(?i)ROWNUM.*?\\d";
        if (Pattern.compile(mysql).matcher(sql).find()){
            return true;
        }else if(Pattern.compile(postgres).matcher(sql).find()){
            return true;
        }else if(Pattern.compile(oracle).matcher(sql).find()){
            return true;
        }
        return false;
    }
}
