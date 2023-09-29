package cn.crabc.core.app.controller;

import cn.crabc.core.app.entity.param.ApiLogParam;
import cn.crabc.core.app.service.system.IBaseApiLogService;
import cn.crabc.core.datasource.util.PageInfo;
import cn.crabc.core.app.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * API访问日志
 *
 * @author yuqf
 */
@RestController
@RequestMapping("/api/box/sys/api/log")
public class ApiLogController {

    @Autowired
    private IBaseApiLogService iBaseApiLogService;

    /**
     * 日志分页
     * @param apiLogParam
     * @return
     */
    @PostMapping("/page")
    public Result logList(@RequestBody ApiLogParam apiLogParam) {
        PageInfo page = iBaseApiLogService.page(apiLogParam);
        return Result.success(page);
    }
}
