/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://renmaitong.adxing.com';
var config = {
    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,
        //创建卡片
      card_add: `${host}/weapp/card/insert_card`,
      // 获得卡片数据
      get_card: `${host}/weapp/card/get_card`,
      //人脉圈选择类型获取用户列表
      choose_user_list: `${host}/weapp/circle/choose_user_list`,

      

      //获取用户所有群ID
      get_user_all_gruop: `${host}/weapp/circle/get_user_all_gruop`,
      //获取当前群下所有用户
      get_group_user_list: `${host}/weapp/circle/get_group_user_list`,

      //获取&&选择 该用户所有群的用户信息 parameter:serach_skill_id
      choose_all_group_user: `${host}/weapp/circle/choose_all_group_user`,




      // 跟新修改卡片
      update_card: `${host}/weapp/card/update_card`,
      get_card_by_id: `${host}/weapp/card/get_card_by_id`,
      // 收藏人员列表
      get_collect_user_list: `${host}/weapp/collect/get_collect_user_list`,
      //收藏用户  参数collect_user_id
      collection_user: `${host}/weapp/collect/collection_user`,
      //添加标签 参数skill_ids
      add_user_skill: `${host}/weapp/skill/add_user_skill`,

      //获取单个用户详情 参数  search_user_id
      get_user_info: `${host}/weapp/circle/get_user_info`,
      
      //获取单个用户详情 参数 get_user_id (要获取用户详情的id)
      get_user_info: `${host}/weapp/circle/get_user_info`,

      //获取用户技能标签 search_user_id
      get_user_skill_info: `${host}/weapp/skill/get_user_skill_info`,
      //获取所有技能列表
      get_skill_list: `${host}/weapp/skill/get_all_skill_data`,
      //绑定群和用户关系
      binding_flock_user: `${host}/weapp/circle/binding_flock_user`,
      //收藏用户
      collection_user: `${host}/weapp/collect/collection_user`,
      //取消收藏collect_user_id
      cancel_collection_user: `${host}/weapp/collect/cancel_collection_user`,

      //或得用户技能点赞数量 参数search_user_id
      get_user_skill_number: `${host}/weapp/skill/get_user_skill_number`,
      //点赞 参数support_user_id
      support_skill: `${host}/weapp/skill/support_skill`
      //   // 测试的请求地址，用于测试会话
      //   requestUrl: `${host}/weapp/user`,

      //   // 测试的信道服务地址
      //   tunnelUrl: `${host}/weapp/tunnel`,

      //   // 上传图片接口
      //   uploadUrl: `${host}/weapp/upload`,
      //   // qweqwe
      //   mailAddUrl: `${host}/weapp/mailadd`,
      //   mailAccess: `${host}/weapp/access`,
      //   mailListUrl: `${host}/weapp/mails`,
      //   mailStatusUrl: `${host}/weapp/mailStatus`,
      //   mailOne: `${host}/weapp/mailOne`,
      //   mailUpdateUrl: `${host}/weapp/mailUpdate`,
      //   mailDelUrl: `${host}/weapp/mailDel`,
      //   lottery_list: `${host}/weapp/lottery/get_lottery_list`,

      //   //小区判断&确认
      //   get_property_list: `${host}/weapp/property/get_property_list`,

      //   //奖品相关
      //   //获取奖品列表
      //   get_lottery_list: `${host}/weapp/lottery/get_lottery_list`,
      //   //组团分享页面onload
      //   get_group_info: `${host}/weapp/lottery/get_group_info`,
      //   //组团加入团
      //   add_group_member: `${host}/weapp/lottery/add_group_member`,
      //   //详情页面点击获取当前团所有成员列表
      // get_lottery_group_member_list: `${host}/weapp/lottery/get_lottery_group_member_list`,
      //   //获取奖品明细
      //   get_lottery_details: `${host}/weapp/lottery/get_lottery_details`,
      //   //参与抽奖
      //   join_lottery: `${host}/weapp/lottery/join_lottery`,
      //   //获取奖品参与用户列表
      //   get_lottery_joined_user_list: `${host}/weapp/lottery/get_lottery_joined_user_list`,
      //   //获取用户获奖结果
      //   get_user_lottery_success: `${host}/weapp/lottery/get_user_lottery_success`,
      //   //获取用户参与抽奖列表
      //   get_user_lottery_list: `${host}/weapp/lottery/get_user_lottery_list`,

      //   //获取奖品赞助商详情
      //   get_lottery_sponsor: `${host}/weapp/lottery/get_lottery_sponsor`,

      //   //用户相关
      //   //助力页面onload
      //   get_lottery_assist: `${host}/weapp/lottery/get_lottery_assist`,
      //   //助力页面用户助力列表
      //   get_lottery_assist_user_list: `${host}/weapp/lottery/get_lottery_assist_user_list`,
      //   //好友助力添加
      //   get_lottery_friend_assist: `${host}/weapp/lottery/get_lottery_friend_assist`,

      //   //绑定小区
      //   bind_property: `${host}/weapp/lotteryUser/bind_property`,
      //   //获取活动安慰奖获得者列表
      //   get_benfit_user_list: `${host}/weapp/lottery/get_benfit_user_list`,
      //   // //保存用户基本信息
      //   // save_user_info: `${host}/weapp/lotteryuser/bind_property`,

      //   // //获取用户基本信息
      //   // get_user_details: `${host}/weapp/lotteryuser/bind_property`,

      //   // //设置用户收件地址
      //   // set_user_address: `${host}/weapp/lotteryuser/bind_property`,

      //   // //获取用户收件地址
      //   // get_user_address: `${host}/weapp/lotteryuser/bind_property`,

      //   // //赞助商相关

      //   // //获取赞助商详情
      //   // get_sponsor_details: `${host}/weapp/sponsor/get_sponsor_details`,
      //   //shouji收集formid
      //   // collect_form_id: `${host}/weapp/collect/collect_form_id`,
      //   // //获取赞助商列表
      //   // get_sponsor_list: `${host}/weapp/sponsor/get_sponsor_list`


      //   //获取首页数据 分页 
      //   get_all_home_data: `${host}/weapp/home/get_all_home_data`,

      //   //领取分享红包（天天领红包） 
      //   user_take_env: `${host}/weapp/envelope/user_take_env`,
      //   //拆开红包（天天领红包） paramdata: {
      //   // from_user_id: 'obOH70NGOU-Q0ZL3_kRjAISJpGY8',
      //   // env_id: 9
      //   // },
      //   split_envelope: `${host}/weapp/envelope/split_envelope`,
      //   //获取详情（天天领红包）
      //   get_envelop_detail: `${host}/weapp/envelope/get_envelop_detail`,
      //   //获取list（天天领红包）
      //   get_envelop_list: `${host}/weapp/envelope/get_envelop_list`,

      //   //帮开记录
      //   get_envelop_split_detail: `${host}/weapp/envelope/get_envelop_split_detail`,

      //   //所有的
      //   get_envelop_all_split_detail: `${host}/weapp/envelope/get_envelop_all_split_detail`,

      //   //按类型获取用户钱包金额 
      //   get_user_wallet_by_type: `${host}/weapp/wallet/get_user_wallet_by_type`,

      //   //网多多商品列表  分类   详情
      //   //wdd list param page: 1,
      //   //          pageSize:4
      //   get_wdd_goods_list: `${host}/weapp/wdd/get_wdd_goods_list`,
      //   //wdd detail id param goods_id
      //   get_wdd_goods_detail_ById: `${host}/weapp/wdd/get_wdd_goods_detail_ById`,
      //   //wdd category list
      //   get_wdd_category_list: `${host}/weapp/wdd/get_wdd_category_list`,
      //   //wdd category list by param category_id
      //   get_wdd_list_by_category: `${host}/weapp/wdd/get_wdd_list_by_category`,
      //   //首页获取是否领过当天的红包 
      //   home_envelop_is_get: `${host}/weapp/home/home_envelop_is_get`,
      //   //wdd detail id param goods_id  pdd
      //   get_wdd_goods_detail_By_Id: `${host}/weapp/wdd/get_wdd_goods_detail_By_Id`,
      //   //wdd detail id param goods_id  pdd
      //   get_pdd_goods_operate_record: `${host}/weapp/wdd/get_pdd_goods_operate_record`,
      //   //签到  
      //   get_point_sign: `${host}/weapp/task/get_point_sign`,
      //   //获取当前用户连续签到几次了
      //   get_point_sign_times: `${host}/weapp/task/get_point_sign_times`,
      //   //获取当前用户连续签到几次了
      //   get_point_seven_times: `${host}/weapp/task/get_point_seven_times`,

      //   //insert  分享获取积分 分享 onShareAppMessage   success之后调取
      //   get_point_share: `${host}/weapp/task/get_point_share`,
      //   //insert  分享获取积分   点击领取分享积分的时候调取
      //   get_point_share_wallet: `${host}/weapp/task/get_point_share_wallet`,
      //   //获取当前分享任务状态 是否完成分享任务 1001 'code'=>1001,'msg'=>'还未分享'  'code'=>1002,'msg'=>'还未领取分享奖励''code'=>1003,'msg'=>'已领取分享奖励'
      //   get_point_share_wallet_status: `${host}/weapp/task/get_point_share_wallet_status`,
      //   //insert  获取任务完成情况 参与活动
      //   get_user_task_list: `${host}/weapp/task/get_user_task_list`,
      //   //获取   点击领取活动任务  调取
      //   get_point_lottery_increase: `${host}/weapp/task/get_point_lottery_increase`,
      //   //获取pdd交易记录 佣金 等信息 
      //   get_wdd_user_order: `${host}/weapp/wdd/get_wdd_user_order`,
      // //记录 用户消息通知的事件 类型
      // event_point: `${host}/weapp/EventPoint/index`,
      // //召回系统   openid 关联
      // connect_two_mini: `${host}/weapp/cha/check_aid`,
      // //流量主导流日志
      // flow_master: `${host}/weapp/cha/flow_master`,

    }
};

module.exports = config;