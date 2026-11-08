import type { UnitExercise } from "./fault-unit";
import { economicCases } from "./criminal-economic";
import { economicSources } from "./criminal-economic/knowledge";

// Published questions remain available for saved answers and older papers.
export const economicCorrectionsRevision =
  "criminal-economic-corrections-2026-09-24.v1";
export const economicCorrectionSources = economicSources;

const original = (id: string) =>
  economicCases.find((c) => c.exercise.id === id)!.exercise;

const proofNegligence = original("cl15-proof-negligence");
const intermediaryBribe = original("cl15-review-intermediary-bribe");
const loanLoss = original("cl16-loan-loss");
const insuranceDanger = original("cl16-insurance-danger");
const invoiceNoTaxPurpose = original("cl16-invoice-no-tax-purpose");
const twoCopySources = original("cl16-review-two-copy-sources");

export const economicCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "economic-proof",
    replaces: proofNegligence.id,
    exercise: {
      ...proofNegligence,
      id: "cl15-proof-negligence-v2",
      facts:
        "资产评估人员甲负责核实一批作为投资依据的机器设备。客户提交的材料缺少关键明细，甲曾在工作邮件中说要补现场核验；随后为赶进度，他既未到场，也未调取仓库记录或完成替代核验，就照录客户所报数额并签章。设备实际大幅短缺，报告重大失实，直接造成投资者一百五十万元损失。现有往来记录未见甲与客户商定虚报设备。",
    },
  },
  {
    topicId: "economic-proof",
    replaces: intermediaryBribe.id,
    exercise: {
      ...intermediaryBribe,
      id: "cl15-review-intermediary-bribe-v2",
      facts:
        "2026年8月，民营评估机构人员甲受托出具资产证明。他已核对过设备清单，发现其中大量设备不存在。客户私下向甲个人账户转入十万元，并在转账前要求他仍按原清单出具证明；甲收款后照办。投资者依据该证明投入资金，直接损失八十万元。转账、核验记录、报告和投资损失均有证据。",
      reference:
        "现行刑法第二百二十九条第二款规定，承担资产评估等职责的人员提供虚假证明文件，同时索取或非法收受财物而构成犯罪的，依处罚较重的规定定罪处罚。甲明知清单虚假仍出证，并为此个人收款；应分别核对两项构成后适用该罪数规则，不能把事实链直接写成两个罪并罚。",
    },
  },
  {
    topicId: "finance-loan",
    replaces: loanLoss.id,
    exercise: {
      ...loanLoss,
      id: "cl16-loan-loss-v2",
      facts:
        "甲为本人经营的加工厂申请贷款，向银行提交虚增销售额的材料，取得二百万元后按采购合同付给材料供应商并投入生产。后来市场变化，贷款不能全额清偿，经依法核算给银行造成直接经济损失八十万元。到期后，甲仍与银行保持联系，提供在产订单，并变卖自有设备偿还部分本金；资金流水未见贷款转入私人消费。",
    },
  },
  {
    topicId: "finance-insurance",
    replaces: insuranceDanger.id,
    exercise: {
      ...insuranceDanger,
      id: "cl16-insurance-danger-v2",
      facts:
        "甲为自己投保的仓库故意制造火灾。仓库紧邻多人居住的楼房，甲事先看过楼内居住情况，仍按计划点火；火势向楼房蔓延，楼内住户紧急疏散，消防员到场才控制火情。随后甲谎称线路故障，骗得保险金十五万元。起火原因、火势范围、虚假报案及理赔流水均已查清。",
    },
  },
  {
    topicId: "finance-invoices",
    replaces: invoiceNoTaxPurpose.id,
    exercise: {
      ...invoiceNoTaxPurpose,
      id: "cl16-invoice-no-tax-purpose-v2",
      facts:
        "甲为夸大经营规模，请乙在没有真实交易的情况下开具增值税专用发票，并在聊天中说只拿发票给投资洽谈方看，不要认证抵扣。乙开票后，甲仅将扫描件放入洽谈材料；税务记录显示该票没有申报抵扣，也没有造成国家税款被骗损失。本题尚未发生基于这些材料骗得投资款的事实。",
    },
  },
  {
    topicId: "finance-copyright",
    replaces: twoCopySources.id,
    exercise: {
      ...twoCopySources,
      id: "cl16-review-two-copy-sources-v2",
      facts:
        "甲未经许可，为销售自行复制一批受保护的教学视频，取得违法所得四万元；另购入他人已制作的侵权音乐复制品，明知未经授权仍出售，取得违法所得六万元。两批作品、销售记录和所得分别查清，款项来源没有交叉。",
      reference:
        "2025年知识产权解释第十三、十四条对应两批行为各自的数额条件；第十五条规定，侵犯著作权后销售自己制作的侵权复制品依第二百一十七条处理，另销售明知是他人制作的侵权复制品并构罪，数罪并罚。本题四万元、六万元违法所得分别达到对应条件。",
    },
  },
];
