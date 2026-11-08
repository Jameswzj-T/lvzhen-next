import type { UnitExercise } from "./fault-unit";
import { cl11Cases } from "./criminal-person/cl11";
import { cl12Cases } from "./criminal-person/cl12";
import { personSources } from "./criminal-person/knowledge";

// Keep published questions for saved answers; only these three practice slots
// advance to fact-based versions.
export const personCorrectionsRevision =
  "criminal-person-corrections-2026-09-24.v1";

export const personCorrectionSources = {
  ...personSources,
  productionSafetyInterpretation: {
    title: "两高《关于办理危害生产安全刑事案件适用法律若干问题的解释》第六条",
    url: "https://www.court.gov.cn/zixun/xiangqing/16326.html",
    note: "法释〔2015〕22号。生产、作业中违反安全管理规定造成一人死亡，达到刑法第一百三十四条第一款的重大伤亡事故门槛；具体责任仍须由行为和因果联系证明。2026-09-24核对。",
  },
};

const original = (id: string) =>
  [...cl11Cases, ...cl12Cases].find((c) => c.exercise.id === id)!.exercise;

const negligentSpecial = original("cl11-negligent-special");
const illegalSearch = original("cl12-search-security");
const officialRetaliation = original("cl12-retaliation-public");

export const personCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "negligent-homicide",
    replaces: negligentSpecial.id,
    exercise: {
      ...negligentSpecial,
      id: "cl11-negligent-special-v2",
      title: "没有锁好的防护罩",
      facts:
        "甲是工厂冲压机操作员。安全规程要求开机前锁好防护罩；甲看见卡扣没有合上，为赶产量仍启动机器。乙按正常工序在旁取件时被裸露的传动装置卷入死亡。事故鉴定确认，防护罩未锁与乙死亡直接相关；甲负责该机开机和防护罩检查，现场无人强令其违章作业。",
      prompt: "本案一般过失致死条款与生产作业中特别条款应如何适用？",
      reference:
        "甲在生产作业中负责检查防护罩，明知未锁仍开机，乙按正常工序取件时被卷入死亡。应先依刑法第一百三十四条第一款审查重大责任事故罪；2015年生产安全司法解释第六条将一人死亡列为重大伤亡事故门槛。第二百三十三条明确法律另有规定的依该规定，不能仅因死亡改用一般过失致死条款。本题未给出强令他人违章冒险作业的事实。",
      sources: [...negligentSpecial.sources, "productionSafetyInterpretation"],
    },
  },
  {
    topicId: "residence-search",
    replaces: illegalSearch.id,
    exercise: {
      ...illegalSearch,
      id: "cl12-search-security-v2",
      facts:
        "商场保安甲仅因顾客乙空手走出商场，就拦住乙并强行带到杂物间。乙明确拒绝搜身，甲仍按住乙双臂，翻查其外套内侧和裤袋；乙数次要求停止，甲才放手。监控和在场证言表明，当时没有乙盗窃的线索，甲也没有取得乙同意或法定搜查授权。",
      reference:
        "甲违背乙明确意愿，以强制方式翻查其身体和衣袋；保安岗位不赋予法定强制搜身权。应依刑法第二百四十五条审查非法搜查罪，不能由商场规定或是否搜出财物决定搜查是否合法。本题只问搜查行为，是否另有独立限制人身自由的犯罪须另查。",
    },
  },
  {
    topicId: "official-retaliation",
    replaces: officialRetaliation.id,
    exercise: {
      ...officialRetaliation,
      id: "cl12-retaliation-public-v2",
      title: "举报后的查封",
      facts:
        "甲是县市场监管部门负责人。乙向上级实名检举甲收受商户财物后，甲在工作消息中说要让乙的店关门，随即指令下属以不存在的违规经营为由，多次查封乙的店铺、扣押货物，致乙停业。相关处理后来因缺乏事实依据被撤销。",
      reference:
        "甲作为国家机关工作人员，因乙检举而利用主管职权指令下属虚构理由查封、扣押，使乙停业；这些事实支持依刑法第二百五十四条审查报复陷害罪。须把身份、职权利用、检举活动与报复行为联系起来，而不能把一切私人争执都纳入本罪。",
    },
  },
];
