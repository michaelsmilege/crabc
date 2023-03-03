package cn.crabc.core.system.service.system.impl;

import cn.crabc.core.app.constant.BaseConstant;
import cn.crabc.core.app.driver.DataSourceManager;
import cn.crabc.core.spi.DataSourceDriver;
import cn.crabc.core.system.entity.vo.PreviewVO;
import cn.crabc.core.system.service.system.IBaseApiTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * API测试和预览 服务实现
 *
 * @author yuqf
 */
@Service
public class BaseApiTestServiceImpl implements IBaseApiTestService {

    @Autowired
    private DataSourceManager dataSourceManager;

    @Override
    public PreviewVO sqlPreview(String datasourceId, String sql) {
        DataSourceDriver dataSource = dataSourceManager.getDataSource(datasourceId);
        List<Map<String, Object>> list = dataSource.selectList(datasourceId, sql, null);
        PreviewVO preview = new PreviewVO();
        if (list != null && !list.isEmpty()) {
            preview.setData(list);
            Set<String> fieldName = list.get(0).keySet();
            preview.setMetadata(fieldName);
        }
        return preview;
    }

    @Override
    public Object testApi(String datasourceId, String sql, Map<String, Object> params) {
        DataSourceDriver dataSource = dataSourceManager.getDataSource(datasourceId);
        Object pageNum = params.get(BaseConstant.PAGE_NUM);
        Object pageSize = params.get(BaseConstant.PAGE_SIZE);
        if (pageNum != null && pageSize != null){
            return dataSource.selectPage(datasourceId, sql, params, Integer.parseInt(pageNum.toString()), Integer.parseInt(pageSize.toString()));
        }else{
            return dataSource.selectList(datasourceId, sql, params);
        }
    }
}
