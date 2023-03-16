package cn.crabc.core.admin.service.core.impl;


import cn.crabc.core.admin.service.core.IBaseDataService;
import cn.crabc.core.app.driver.DataSourceManager;
import cn.crabc.core.spi.DataSourceDriver;
import cn.crabc.core.spi.bean.BaseDataSource;
import cn.crabc.core.spi.bean.Column;
import cn.crabc.core.spi.bean.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 通用接口服务 实现类
 *
 * @author yuqf
 */
@Service
public class BaseDataServiceImpl implements IBaseDataService {

    @Autowired
    private DataSourceManager dataSourceManager;

    @Override
    public List<String> getSchemas(String dataSourceId) {
        return null;
    }

    @Override
    public List<Table> getTables(String dataSourceId, String schema) {
        return null;
    }

    @Override
    public List<Column> getColumns(String dataSourceId, String schema, String table) {
        return null;
    }

    @Override
    public Integer testConnection(BaseDataSource dataSource) {
        Integer result = dataSourceManager.test(dataSource);
        return result;
    }

    @Override
    public List<Map<String, Object>> query(String datasourceId, String schema, String sql, List<Object> params) {
        DataSourceDriver dataSourceDriver = dataSourceManager.getDataSource(datasourceId);
        return dataSourceDriver.selectList(datasourceId, schema, sql, params.get(0));
    }

    @Override
    public Integer execute(String datasourceId, String schema, String sql, List<Object> params) {
        DataSourceDriver dataSourceDriver = dataSourceManager.getDataSource(datasourceId);
        for(Object param : params) {
            dataSourceDriver.execute(datasourceId, schema, sql, param);
        }
        return 1;
    }
}
