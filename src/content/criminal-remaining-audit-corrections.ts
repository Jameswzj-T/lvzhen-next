import type { ContentSources, UnitExercise } from "./fault-unit";
import { officeCases } from "./criminal-office";
import { officeSources } from "./criminal-office/knowledge";
import { capstoneGapCases } from "./criminal-capstone";

// Clarify statutory identity in new versions; published facts remain readable.
export const remainingAuditRevision = "criminal-remaining-audit-2026-09-30.v1";
export const remainingAuditSources: ContentSources = {
  law: {
    title:
      "《中华人民共和国刑法》第九十三条、第三百八十二、三百八十五、三百八十八条之一、三百九十条之一及三百九十二条",
    url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2025/art_890f1333b6284c3cbb225c3cd2647c4b.html",
    note: "2026-09-30定向核对公务身份与职务犯罪主体。官网直取失败，取得官方检索正文，并以人大刑法修正案（九）及2026年贪污贿赂解释交叉核对。补明国有单位或国家机关任职事实，不要求考生凭章节名称推定身份；不代表全题库专业验收。",
  },
  bribe2016: officeSources.bribe2016,
  bribe2007: officeSources.bribe2007,
  bribe2026: officeSources.bribe2026,
};

const originals = [...officeCases, ...capstoneGapCases];
function clarifyIdentity(
  replaces: string,
  oldText: string,
  newText: string,
): { topicId: string; replaces: string; exercise: UnitExercise } {
  const original = originals.find((item) => item.exercise.id === replaces);
  if (!original || !original.exercise.facts.includes(oldText)) {
    throw new Error(`Missing original identity facts: ${replaces}`);
  }
  const id = `${replaces}-v2`;
  return {
    topicId: original.topicId,
    replaces,
    exercise: {
      ...original.exercise,
      id,
      caseId: id,
      facts: original.exercise.facts.replace(oldText, newText),
      ...(original.exercise.criteria
        ? {
            criteria: original.exercise.criteria.map((criterion, i) => ({
              ...criterion,
              id: `${id}-p${i + 1}`,
            })),
          }
        : {}),
    },
  };
}

export const remainingAuditCorrections = [
  clarifyIdentity(
    "cl19-graft-donation",
    "事业单位财务负责人丙",
    "国有事业单位财务负责人丙",
  ),
  clarifyIdentity(
    "cl19-receipt-retirement",
    "甲在职期间负责某项目审批。",
    "甲在某国家机关任职期间，负责某项目的行政审批。",
  ),
  clarifyIdentity(
    "cl19-review-spouse-salary",
    "审批负责人甲",
    "国家机关负责项目审批的甲",
  ),
  clarifyIdentity(
    "cl19-benefit-travel",
    "审批人员甲",
    "国家机关负责项目审批的工作人员甲",
  ),
  clarifyIdentity(
    "cl19-broker-matchmaking",
    "审批人员甲",
    "国家机关负责项目审批的工作人员甲",
  ),
  clarifyIdentity(
    "cap-gap-influence-payment",
    "向审批主管的成年儿子乙支付10万元",
    "向某国家机关项目审批主管的成年儿子乙支付10万元",
  ),
  clarifyIdentity(
    "cap-gap-influence-departed",
    "向已经离职的原主管丁支付8万元",
    "向某国家机关已经离职的原主管丁支付8万元",
  ),
];
