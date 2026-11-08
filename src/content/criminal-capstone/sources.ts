import type { ContentSources } from "../fault-unit";
import { propertySources } from "../criminal-property/knowledge";
import { generalSources } from "../criminal-general/knowledge";
import { safetySources } from "../criminal-safety/knowledge";
import { socialSources } from "../criminal-social/knowledge";
import { officeSources } from "../criminal-office/knowledge";
import { economicSources } from "../criminal-economic/knowledge";
export const capstoneSources: ContentSources = {
  law: {
    ...officeSources.law,
    title: "《中华人民共和国刑法》总则及本题对应分则条款",
    note: "2026-09-15核对税务机关收录至修正案（十二）的现行正文；本包逐题按行为、主体、形态、罪数及量刑规定说明，不以量刑标准替代完整犯罪构成。参考点为本项目自编，非官方评分答案。",
  },
  robbery: propertySources.robbery2016,
  theft: {
    ...propertySources.theft,
    note: "2026-09-15补核第四条的电力据实计量和第八条家庭成员、近亲属财物获谅解的特别处理；不把普通数额或亲属关系单独作为结论。",
  },
  defense: generalSources.defenseGuide,
  surrender: generalSources.surrenderInterpretation,
  surrender2010: {
    title: "最高法《关于处理自首和立功若干具体问题的意见》",
    url: "https://gongbao.court.gov.cn/Details/f3089058d37e11cd16d801530934ae.html",
    note: "法发〔2010〕60号。2026-09-15定向读取第一部分，核对主动报案、留在现场及如实交代的自动投案处理；不引用其历史量刑指导比例。",
  },
  work2015: safetySources.work2015,
  work2022: safetySources.work2022,
  harbor: socialSources.harbor2021,
  proceeds2025: socialSources.proceeds2025,
  bribe2016: officeSources.bribe2016,
  bribe2026: officeSources.bribe2026,
  bribe2007: officeSources.bribe2007,
  robbery2000: {
    title: "最高法《关于审理抢劫案件具体应用法律若干问题的解释》",
    url: "https://www.yncj.gov.cn/cjxzfxxgk/flfg5641/20160822/260101.html",
    note: "法释〔2000〕35号。2026-09-15取得政府站转载的第五条检索正文，并与检察机关及法院释义核对第五、六条的显示枪支、携凶抢夺。原页直接打开失败，未标为全文读取；题目使用鉴定真枪及管制刀具，未延伸到仿真枪争议。",
  },
  guns2009: {
    title: "最高法涉枪支、弹药、爆炸物刑事案件解释（2009修正）",
    url: "https://www.court.gov.cn/zixun/xiangqing/77.html",
    note: "2026-09-15定向读取第一、五条，核对军用枪支买卖、持有的基本数量与资格区分。新题不涉及低比动能气枪，其2018年批复要求另作综合评价，不能套本题一支军用枪的处理。",
  },
  drug2022: {
    ...economicSources.drug2022,
    note: "2026-09-15补读第七条，核对未经批准生产注射剂与足以严重危害人体健康；罪数依刑法第一百四十二条之一第二款，不沿用未批准即假药的旧认识。",
  },
  smuggling2014: {
    ...economicSources.smuggling2014,
    note: "2026-09-15补读第一、六条的火药枪及伪造货币专门标准，数额不套普通货物。其他特殊物品、单位及加重未在本轮穷尽。",
  },
  prosecution2022: {
    ...economicSources.prosecution2022,
    note: "2026-09-15补核第八条会计资料涉及五十万元及依法应提供而隐匿、销毁、拒不交出等路径（官方正文检索及上交所公开文件交叉核对）；不以追诉标准替代故意、资料范围等构成。",
  },
  tax2024: {
    ...economicSources.tax2024,
    note: "2026-09-15补读第五、六条：抗税轻伤与重伤死亡分别处理、欠税后无偿转移等手段及无法追缴的联系。不给单纯无财产缴税者补写犯罪故意。",
  },
  market2019: {
    title: "两高《关于办理操纵证券、期货市场刑事案件适用法律若干问题的解释》",
    url: "https://www.court.gov.cn/zixun/xiangqing/167222.html",
    note: "法释〔2019〕9号。2026-09-15读取第一至三条，核对对倒、公开评价反向交易与一百万元违法所得路径；其原第四项引文须与修正后刑法第一百八十二条现行列项对应，不沿用旧款号。",
  },
  ip2025: {
    ...economicSources.ip2025,
    note: "2026-09-15补读第六条：一种标识一般一万件、违法所得二万元或非法经营三万元的路径；新题均在2025年解释施行后，不沿用旧二万件起点。",
  },
  computer2011: {
    title:
      "两高《关于办理危害计算机信息系统安全刑事案件应用法律若干问题的解释》",
    url: "https://www.court.gov.cn/fabu/xiangqing/3085.html",
    note: "法释〔2011〕19号。2026-09-15读取第一至三条的数据获取、专用工具、违法所得五千元等条件；不把正常授权测试和通用工具一律犯罪化。",
  },
  land2026: {
    title: "两高《关于办理非法占用耕地案件适用法律若干问题的规定》",
    url: "https://www.court.gov.cn/fabu/xiangqing/499421.html",
    note: "法释〔2026〕10号，2026-05-18施行。2026-09-15核对第十一至十四条：占用毁坏、永久基本农田五亩与其他耕地十亩、竞合择重及单位；黑土地另有更严格专门规定，本轮题设明确排除，未照搬2000年旧文本。",
  },
  mining2016: {
    title: "两高《关于办理非法采矿、破坏性采矿刑事案件适用法律若干问题的解释》",
    url: "https://www.court.gov.cn/zixun/xiangqing/31621.html",
    note: "法释〔2016〕25号。2026-09-15读取第一至三、十三至十五条，核对无许可、普通矿产品价值及地方幅度。新题不涉及海砂及2023年海砂纪要特别处理，也不穷尽破坏性采矿标准。",
  },
  invasive2024: {
    title: "最高法入库参考案例中的外来入侵物种认定要旨",
    url: "https://www.court.gov.cn/zixun/xiangqing/448841.html",
    note: "2026-09-15仅用裁判要旨核对名录认定及种类、数量、区位、后果等综合严重程度，不复制真实案情或数字为标准；本项目事实另行编写，不将参考案例等同统一数额解释。",
  },
  prostitution2017: {
    ...socialSources.prostitution2017,
    note: "2026-09-15补读第十一、十二条：就医确诊等明知证据、实际传播后果非必要条件、严重性病的严格范围。新题使用梅毒确诊，不自行扩列病种或给出医学诊疗意见。",
  },
  militaryMarriage2023: {
    title: "最高检危害国防利益、侵犯军人军属权益典型案例中的军婚规则",
    url: "https://www.spp.gov.cn/spp/xwfbh/wsfbt/202307/t20230728_623148.shtml",
    note: "2026-09-15定向核对持续稳定共同生活与同居、不以对外自称夫妻为必要；法定对象仍依刑法第二百五十九条。未复制真实人物与案情，新题独立编写。",
  },
};
