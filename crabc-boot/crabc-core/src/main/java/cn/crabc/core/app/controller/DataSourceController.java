package cn.crabc.core.app.controller;

import cn.crabc.core.app.entity.BaseDatasource;
import cn.crabc.core.app.service.system.IBaseDataSourceService;
import cn.crabc.core.datasource.util.PageInfo;
import cn.crabc.core.app.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 数据源管理
 *
 * @author yuqf
 */
@RestController
@RequestMapping("/api/box/sys/datasource")
public class DataSourceController {

    @Autowired
    private IBaseDataSourceService baseDataSourceService;

    /**
     * 数据源分页列表
     * @param datasourceName
     * @param pageNum
     * @param pageSize
     * @return
     */
    @GetMapping("/page")
    public Result list(String datasourceName, Integer pageNum, Integer pageSize) {
        PageInfo<BaseDatasource> dataSourcePage = baseDataSourceService.getDataSourcePage(datasourceName, pageNum, pageSize);
        return Result.success(dataSourcePage);
    }

    /**
     * 新增数据源
     * @param dataSource
     * @return
     */
    @PostMapping
    public Result add(BaseDatasource dataSource) {
        Integer result = baseDataSourceService.addDataSource(dataSource);
        if(result == 1){
            return Result.success("操作成功");
        }
        return Result.error("操作失败");
    }

    /**
     * 编辑
     * @param dataSource
     * @return
     */
    @PutMapping
    public Result update(BaseDatasource dataSource) {
        Integer result = baseDataSourceService.updateDataSource(dataSource);
        if(result == 1){
            return Result.success("操作成功");
        }
        return Result.error("操作失败");
    }

    /**
     * 数据源测试连接
     * @param dataSource
     * @return
     */
    @PostMapping("/test")
    public Result test(BaseDatasource dataSource) {
        String test = baseDataSourceService.test(dataSource);
        if("1".equals(test)){
            return Result.success("测试成功");
        }
        return Result.error("测试失败：" + test);
    }

    /**
     * 删除数据源
     * @param dataSourceId
     * @return
     */
    @DeleteMapping("/{dataSourceId}")
    public Result delete(@PathVariable Integer dataSourceId) {
        baseDataSourceService.deleteDataSource(dataSourceId);
        return Result.success("操作成功！");
    }
}
