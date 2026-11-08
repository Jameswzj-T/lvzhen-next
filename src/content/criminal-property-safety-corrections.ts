import type { UnitExercise } from "./fault-unit";
import { propertyCases } from "./criminal-property";
import { safetyCases } from "./criminal-safety";
import { propertySources } from "./criminal-property/knowledge";
import { safetySources } from "./criminal-safety/knowledge";

// Keep published stems and saved answers available under their original IDs.
export const propertySafetyCorrectionsRevision =
  "criminal-property-safety-corrections-2026-09-24.v1";

export const propertySafetyCorrectionSources = {
  ...propertySources,
  ...safetySources,
  law: {
    title: "《中华人民共和国刑法》财产及公共安全相关条款",
    url: propertySources.law.url,
    note: "CL13–14 修订题涉及财产与公共安全条款，2026-09-24定向复核。",
  },
};

const original = (id: string) =>
  [...propertyCases, ...safetyCases].find((c) => c.exercise.id === id)!
    .exercise;

const fundsStock = original("cl13-funds-stock");
const fundsTwoUses = original("cl13-funds-two-uses");
const specificPersonal = original("cl13-specific-personal");
const fireCamping = original("cl14-fire-camping");
const reviewStorage = original("cl14-review-storage");

export const propertySafetyCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "property-fund-use",
    replaces: fundsStock.id,
    exercise: {
      ...fundsStock,
      id: "cl13-funds-stock-v2",
      facts:
        "2026年8月，民营公司出纳甲擅自从经管账户转出六万元到个人证券账户买股票，十二天后卖出并将本金全额转回。公司不曾授权这笔转款；银行流水留有转出、交易和转回记录，账上也未将该款虚列为费用核销。",
    },
  },
  {
    topicId: "property-fund-use",
    replaces: fundsTwoUses.id,
    exercise: {
      ...fundsTwoUses,
      id: "cl13-funds-two-uses-v2",
      facts:
        "2026年8月，两个独立民营公司的财务人员各擅自从经管账户转出四万元归个人使用：甲用来购入股票，十天后将本金转回；乙用来参加非法赌博，两天后将本金转回。两笔转出、使用和归还均有银行流水，题中没有其他特殊加重情节。",
    },
  },
  {
    topicId: "property-specific-funds",
    replaces: specificPersonal.id,
    exercise: {
      ...specificPersonal,
      id: "cl13-specific-personal-v2",
      facts:
        "2026年7月，负责经管救济款的国家机关工作人员甲，将八万元救济资金转入自己经营的私人网店进货，二十天后把八万元全额转回原账户。该款依法属于公共资金，甲的身份、经管权限及资金往来均有记录。",
    },
  },
  {
    topicId: "safety-fire",
    replaces: fireCamping.id,
    exercise: {
      ...fireCamping,
      id: "cl14-fire-camping-v2",
      facts:
        "甲在依法禁止用火、标有醒目警示的林区露营。他知道离开前应彻底熄灭火堆，却只查看表面未见明火便离开，没有检查仍冒烟的余烬。当天风力增大，余火引燃林木。调查确认这一处余火是起火原因，并造成公私财产重大损失。甲接到起火通知后立即返回协助扑救。",
    },
  },
  {
    topicId: "safety-dangerous-work",
    replaces: reviewStorage.id,
    exercise: {
      ...reviewStorage,
      id: "cl14-review-storage-v2",
      facts:
        "仓储企业负责人甲为掩盖危险物品储存中的持续违规，安排关闭直接关系生产安全的监控。值班记录连续数日显示温度异常，工作人员多次请求停仓检查，甲仍安排原区域照常作业。后来该违规引发事故，造成三人重伤；现场勘验确认违规储存与事故的因果联系。本题只评价这一事故过程。",
    },
  },
];
