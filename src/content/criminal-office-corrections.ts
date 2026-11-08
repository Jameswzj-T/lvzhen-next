import type { UnitExercise } from "./fault-unit";
import { officeCases } from "./criminal-office";
import { officeSources } from "./criminal-office/knowledge";

// Published versions remain available for existing answers and frozen papers.
export const officeCorrectionsRevision =
  "criminal-office-corrections-2026-09-24.v1";
export const officeCorrectionSources = officeSources;

const original = (id: string) =>
  officeCases.find((c) => c.exercise.id === id)!.exercise;

const specialTax = original("cl19-special-tax");
const specialFood = original("cl19-special-food");
const spyAcceptance = original("cl20-spy-acceptance");
const defectionOfficial = original("cl20-defection-official");
const joiningEnemy = original("cl20-review-joining-enemy");
const defectionContext = original("cl20-review-defection-context");
const supplyAndUse = original("cl20-review-supply-and-use");

export const officeCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "office-special-duty",
    replaces: specialTax.id,
    exercise: {
      ...specialTax,
      id: "cl19-special-tax-v2",
      facts:
        "税务人员甲为照顾亲属经营的企业，明知核定资料显示应征税款，仍擅自删减计税项目并将征收记录改小。税款核算和入库记录显示，该企业因此少缴80万元；企业随后注销并转走资产，税务机关依法追缴未果。甲未收财，也没有其他共同犯罪事实。",
    },
  },
  {
    topicId: "office-special-duty",
    replaces: specialFood.id,
    exercise: {
      ...specialFood,
      id: "cl19-special-food-v2",
      facts:
        "负有食品安全监督管理职责的机关工作人员乙，收到检验报告和复检材料：某食品厂正在生产的一批食品含有超出法定限量的有害物质。按其职责应及时查处，乙却把材料搁置数月，也不移交同事。收件时该批食品尚未出厂，此后仍被售出；七名消费者食用后重伤，检验和病历证实伤害由该物质造成。",
    },
  },
  {
    topicId: "state-spy",
    replaces: spyAcceptance.id,
    exercise: {
      ...spyAcceptance,
      id: "cl20-spy-acceptance-v2",
      title: "尚未取走的部署资料",
      facts:
        "境外某机构的间谍组织性质及其联络人的代理人身份已经依法查实。联络人向甲说明身份，要求甲秘密取得我方边防部队未公开的部署和战备调动安排，并约定通过加密账号传送。甲阅读任务清单后确认接受，领取预付款；双方通联和收款记录与此相符。甲在实际搜集资料前被查获。",
      reference:
        "第一百一十条规定参加间谍组织或者接受其及代理人任务等行为。甲明知联络人身份，接受针对未公开军事部署的秘密搜集任务；不能仅因尚未搜集交付资料就排除该罪，也不能把普通境外合作一概归入本罪。",
    },
  },
  {
    topicId: "state-defection",
    replaces: defectionOfficial.id,
    exercise: {
      ...defectionOfficial,
      id: "cl20-defection-official-v2",
      facts:
        "国家机关工作人员甲随公务团组在境外履职期间，未经批准脱离岗位，向当地机关申请政治庇护，公开声明不再返回我国机关任职，并拒绝团组的返岗通知。甲辩称自己没有带出国家秘密，也没有造成另经量化的严重损失。",
      options: defectionOfficial.options?.map((option) =>
        option.id === "c"
          ? {
              ...option,
              text: "不能因此排除，应结合公务身份、履职期间擅离岗位及拒绝返岗等事实判断。",
            }
          : option,
      ),
      reference:
        "甲在境外履行公务时擅离岗位、寻求当地庇护并拒绝返岗，须结合这些事实审查第一百零九条。基本构成不要求携带国家秘密或另有量化重大损失；不能反过来把所有境外离队都认定为叛逃。",
    },
  },
  {
    topicId: "state-defection",
    replaces: joiningEnemy.id,
    exercise: {
      ...joiningEnemy,
      id: "cl20-review-joining-enemy-v2",
      title: "越过防线的普通公民",
      facts:
        "具有我国国籍的普通公民甲在战争期间越过防线，进入敌方控制区，向敌方政治机关表示愿为其效力，接受安排并持续参与招募和联络。甲过去未在我国国家机关任职，也不具有军人身份，未向敌方提供国家秘密。本题只考查上述行为是否要求特殊身份。",
      reference:
        "甲越过防线加入敌方并持续为其效力；第一百零八条并不把国家机关工作人员或军人身份作为投敌叛变的必要条件，也不要求同时提供国家秘密。不能混同第一百零九条的叛逃主体与情境。",
    },
  },
  {
    topicId: "state-defection",
    replaces: defectionContext.id,
    exercise: {
      ...defectionContext,
      id: "cl20-review-defection-context-v2",
      facts:
        "国家机关工作人员甲在境外执行公务时擅离岗位，向当地机关申请政治庇护，声明不再返回我国机关任职，并拒绝公务团组返岗通知。乙已依法离职，不掌握国家秘密，随后依法出境居留；没有证据表明乙受领公务任务或有类似甲的行为。两人都没有交出涉密文件。",
      reference:
        "依第一百零九条看行为时身份、公务活动及擅离岗位后的行为。甲申请庇护、拒绝返岗的事实支持审查叛逃；乙已离职并合法出境，不得因过去职务或境外居留推定犯罪。",
    },
  },
  {
    topicId: "defense-equipment",
    replaces: supplyAndUse.id,
    exercise: {
      ...supplyAndUse,
      id: "cl20-review-supply-and-use-v2",
      facts:
        "甲公司供应给武装部队的一批军用车辆，内部检验单显示关键制动指标未达约定标准。负责人看过检验单后仍命令贴合格标签并交付，入库记录与该批车辆对应。另一批检验合格的装备在部队使用时，现役军人乙严重违反已培训的使用规定，引发事故致一人死亡；事故鉴定表明乙操作失误与前批供货无关。",
    },
  },
];
