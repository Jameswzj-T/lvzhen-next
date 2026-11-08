import type { ContentSources, UnitExercise } from "./fault-unit";
import { written } from "./criminal-package-one/authoring";
import { cl11Cases } from "./criminal-person/cl11";
import { personSources } from "./criminal-person/knowledge";
import { networkCases } from "./criminal-social/network";

// Replace current practice slots without rewriting published questions or answers.
export const specialAuditRevision = "criminal-special-audit-2026-09-30.v1";
export const specialAuditSources: ContentSources = {
  law: {
    title:
      "《中华人民共和国刑法》第二百三十六条之一、二百六十四、二百八十六及二百八十七条",
    url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2025/art_890f1333b6284c3cbb225c3cd2647c4b.html",
    note: "2026-09-30定向核对照护职责性侵的对象条件，以及计算机作为盗窃手段与破坏系统的区别。本次修订补齐必要事实，不代表全题库法律验收。",
  },
  minorProtection: personSources.minorProtection,
  creditCardInterpretation: {
    title:
      "两高《关于办理妨害信用卡管理刑事案件具体应用法律若干问题的解释》（2018修正）第五条",
    url: "https://www.court.gov.cn/fabu/xiangqing/132701.html",
    note: "2026-09-30读取最高法原文。第五条第二款第三项包含非法获取信用卡信息后经互联网等使用的冒用方式；不能仅以没有自然人受骗处分排除信用卡诈骗。修订题限定为未绑定银行卡的支付账户既有余额，不对所有网银盗转作统一定性。",
  },
  paymentBalanceAnalysis: {
    title: "《窃取他人支付宝账户资金可构成盗窃罪》",
    url: "https://www.spp.gov.cn/llyj/202201/t20220125_542653.shtml",
    note: "2026-09-30取得最高检网站检索正文，直接打开失败。参照账户余额与绑定银行卡资金的区分；这是理论实务分析，不是司法解释。修订案情自行编写，未移用文中案件。",
  },
};

const originalCare = cl11Cases.find(
  (item) => item.exercise.id === "cl11-sexual-care-actual",
)!.exercise;
const originalTransfer = networkCases.find(
  (item) => item.exercise.id === "cl17-system-online-theft",
)!.exercise;

export const specialAuditCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "sexual-care",
    replaces: originalCare.id,
    exercise: written(
      "cl11-sexual-care-actual-v2",
      "sexual-care",
      originalCare.title,
      originalCare.facts.replace("十五周岁的乙", "十五周岁的女儿乙"),
      originalCare.prompt,
      "不能仅据此排除。2023年解释第十五条将共同生活等事实形成的照顾、保护职责纳入特殊职责。乙是已满十四周岁不满十六周岁的未成年女性，甲长期实际照护乙，明知其年龄仍发生性关系，符合第二百三十六条之一；是否登记、是否持教师证不是唯一标准，乙未拒绝也不能排除此罪。",
      [
        [
          "实际职责",
          "同住一年并承担食宿、保护等体现事实照护职责。",
          "不是只凭亲友称谓认定，也不以登记为唯一依据。",
        ],
        [
          "对象与行为",
          "乙为十五周岁女性，甲明知其年龄仍与其发生性关系，对应本罪对象及行为条件。",
          "不能把满十四岁理解为无特殊保护，也不能省略本罪的女性对象条件。",
        ],
        [
          "辩解评价",
          "未登记和未拒绝均不足以排除本罪。",
          "未给出强奸事实时不臆造暴力。",
        ],
      ],
      { sources: originalCare.sources },
    ).exercise,
  },
  {
    topicId: "network-system",
    replaces: originalTransfer.id,
    exercise: written(
      "cl17-system-online-theft-v2",
      "network-system",
      "支付账户中的转账",
      "甲偷看取得乙的第三方支付账户登录密码和支付密码，趁乙不在登录账户，将其中已有的十万元余额转至自己控制的账户并花掉。该支付账户未绑定银行卡，也未开通信贷支付。乙事后查看账单才发现款项被转走。平台系统一直正常运行，甲没有篡改系统功能或交易记录。",
      originalTransfer.prompt,
      "甲未经乙同意，秘密转走乙第三方支付账户内已有的十万元余额并占有，应按盗窃罪评价。依刑法第二百八十七条，利用计算机实施盗窃等犯罪仍按相应犯罪规定处理。题目限定未绑定银行卡、未开通信贷支付，不能把该结论直接推广到冒用银行卡的场景。系统正常且没有破坏操作和严重后果，不能仅因网上转账增加破坏计算机信息系统罪。",
      [
        [
          "财产转移",
          "乙没有同意转款，甲秘密转走其支付账户已有余额并占有。",
          "根据具体取财方式判断，不能看到转账就认定存在受骗处分。",
        ],
        [
          "适用罪名",
          "联系刑法第二百八十七条与盗窃罪，评价秘密取得支付账户余额。",
          "本题未涉及银行卡资金，不将本题结论推广到一切网上转账。",
        ],
        [
          "系统区别",
          "系统正常且无破坏事实，不机械增加破坏系统罪。",
          "不把所有计算机犯罪都视为相互吸收。",
        ],
      ],
      {
        sources: ["law", "creditCardInterpretation", "paymentBalanceAnalysis"],
      },
    ).exercise,
  },
];
