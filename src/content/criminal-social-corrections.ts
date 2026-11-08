import type { UnitExercise } from "./fault-unit";
import { socialCases } from "./criminal-social";
import { socialSources } from "./criminal-social/knowledge";

// Keep published versions for earlier answers and frozen papers.
export const socialCorrectionsRevision =
  "criminal-social-corrections-2026-09-24.v1";
export const socialCorrectionSources = {
  ...socialSources,
  extortion2013: {
    title: "两高《关于办理敲诈勒索刑事案件适用法律若干问题的解释》",
    url: "https://gongbao.court.gov.cn/Details/928d298574d9fa63d0bea3756d7f80.html",
    note: "2013年解释第一条规定数额较大的地方标准区间为二千至五千元；新版码头题设一万元已超过该区间上限。2026-09-24定向核对。",
  },
};

const original = (id: string) =>
  socialCases.find((c) => c.exercise.id === id)!.exercise;

const inspectionRevenge = original("cl17-review-inspection-revenge");
const criminalGroup = original("cl17-review-criminal-group");
const lawyerError = original("cl17-evidence-lawyer-error");
const coercionInjury = original("cl18-prostitution-coercion-injury");
const wasteMonitor = original("cl18-review-waste-monitor");

export const socialCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "public-police",
    replaces: inspectionRevenge.id,
    exercise: {
      ...inspectionRevenge,
      id: "cl17-review-inspection-revenge-v2",
      facts:
        "甲在市场监管人员依法检查其商铺时，以殴打相威胁并堵住检查人员，使检查无法进行。民警乙曾在另一案件中依法处罚甲。数日后，乙休假在家、没有处置警情时，甲到其家门口说‘上次罚我的账今天算’，接连挥拳击打乙，造成经鉴定的轻伤。检查现场与乙家门口的经过分别有录像证实。",
    },
  },
  {
    topicId: "public-gang",
    replaces: criminalGroup.id,
    exercise: {
      ...criminalGroup,
      id: "cl17-review-criminal-group-v2",
      facts:
        "甲在码头纠集二十余人，三年间维持固定层级与分工，以向商户强收装卸费取得收入，并用该收入发放成员报酬和购买作案工具。成员多次殴打、威胁不肯交费的商户，数家商户被迫停业；该码头的装卸业务长期须经甲同意才能开展。甲又单独指挥成员向一户拒付费用的商户索款，威胁后取得一万元，索款过程及金额均有记录。丁是组织普通参加者，未参加这次索款；现有通信和现场证据也未显示丁与索款者商议或分款。",
      reference:
        "刑法第二百九十四条第五款的组织、经济、行为及危害性特征应从固定分工、经费、反复暴力和行业控制等事实综合判断；第四款规定组织犯罪之外另有犯罪的数罪并罚。甲指挥索款，丁的具体罪责则须另据其参与和共同故意证明，不能只凭组织成员身份归责。",
      sources: ["law", "extortion2013"],
    },
  },
  {
    topicId: "justice-evidence",
    replaces: lawyerError.id,
    exercise: {
      ...lawyerError,
      id: "cl17-evidence-lawyer-error-v2",
      facts:
        "辩护律师甲收到证人提供的不在场票据后，查验了能接触到的原始票据，向证人反复核对时间，并保存了核验记录，随后提交材料。后来警方恢复另一段监控，显示证人在交付材料前独自制作了假票据；甲获知后当天向办案机关递交更正说明。现有制作记录和往来消息未显示甲参与造假或事前指使证人改口。",
      criteria: lawyerError.criteria!.map((criterion) =>
        criterion.label === "故意证据"
          ? {
              ...criterion,
              meaning:
                "核验记录、更正行为及现有制作和往来证据，不支持仅凭材料失实推认甲有意伪造。",
              acceptable:
                "意思相当且能联系本案事实即可：核验记录、更正行为及现有制作和往来证据，不支持仅凭材料失实推认甲有意伪造。",
            }
          : criterion,
      ),
    },
  },
  {
    topicId: "social-prostitution",
    replaces: coercionInjury.id,
    exercise: {
      ...coercionInjury,
      id: "cl18-prostitution-coercion-injury-v2",
      facts:
        "甲限制成年乙离开，并以伤害其家属相威胁，逼乙接客；乙反复拒绝，甲仍控制她继续接客。乙后来逃离，该安排随之停止。一周后，甲在另一地点找到乙，边说‘让你逃’边持棍多次击打其头部。伤情鉴定确认乙因此重伤，逃离前的威胁、接客及后来殴打分别有证人和录像证实。",
      prompt: "甲前后两段行为应如何评价和处理？",
      criteria: coercionInjury.criteria!.map((criterion) =>
        criterion.label === "伤害事实"
          ? {
              ...criterion,
              meaning:
                "乙逃离并停止接客安排后，甲另行追打其头部致重伤，支持对伤害行为独立评价。",
              acceptable:
                "意思相当且能联系本案事实即可：乙逃离并停止接客安排后，甲另行追打其头部致重伤，支持对伤害行为独立评价。",
            }
          : criterion,
      ),
    },
  },
  {
    topicId: "environment-pollution",
    replaces: wasteMonitor.id,
    exercise: {
      ...wasteMonitor,
      id: "cl18-review-waste-monitor-v2",
      facts:
        "2026年9月，一家实行排污许可重点管理的企业负责人甲，授意负责设施维护的乙改动自动监测参数，持续排放依法要求自动监测的总磷污染物，使监管平台读数虚低。甲乙的沟通、参数修改记录、原始采样数据和实际排放记录均已查实。",
      options: wasteMonitor.options?.map((option) =>
        option.id === "c"
          ? {
              ...option,
              text: "只要监测参数被改动，就必须对污染环境罪和破坏计算机信息系统罪数罪并罚。",
              explanation:
                "另一罪是否成立须另核构成要件；同一行为同时构成两罪时，解释第十一条采用择一重罪规则。",
            }
          : option.id === "d"
            ? {
                ...option,
                text: "若同一行为还构成破坏计算机信息系统罪，应依处罚较重的规定定罪处罚。",
                explanation:
                  "竞合处理以两罪均成立为前提，不由改动设备自动推定另一罪。",
              }
            : option,
      ),
      reference:
        "2026年第二次修正的污染解释第一条第七项列有重点管理单位篡改自动监测并排放总磷的路径，不只按超标倍数判断。是否另构成破坏计算机信息系统罪还须核对该罪的要件；若同一行为同时构成两罪，依解释第十一条择一重罪，不重复并罚。",
    },
  },
];
