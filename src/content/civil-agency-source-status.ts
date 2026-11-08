import type { ContentSources } from "./fault-unit";
import { civilAgencyPreparation, civilAgencySources } from "./civil-agency";

/** Later scoped review, separate from the byte-preserved original teaching draft. */
export const civilAgencyCurrentSourceReview = {
  reviewedAtUtc: "2026-10-05T04:47:00.936537+00:00",
  revision: "civil-agency-2026-10-05.v2",
  frozenContentSHA256:
    "cbc171cc59d6395b6d45385efc3770c24b817ed0bf98ded897a11effddb9c7c7",
  evidenceSHA256:
    "d7f67fa2d19d5a2e4baa25e17cec64ff9fed55db377ce30ce18dafa50a237593",
  currentEffectLabelVerified: true,
  currentOfficialAttachedTextReadForScopedClauses: true,
  scopedTeachingRulesSupported: true,
  records: [
    {
      name: "civil-code",
      title: "中华人民共和国民法典",
      recordId: "ff808081729d1efe01729d50b5c500bf",
      statusCode: 3,
      statusLabel: "有效",
      observedAtUtc: "2026-10-05T04:38:40.162321+00:00",
      publicDetailUrl:
        "https://flk.npc.gov.cn/detail?id=ff808081729d1efe01729d50b5c500bf&title=%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B0%91%E6%B3%95%E5%85%B8",
      documentSha256:
        "6926a597a66c5aad4803591ce9a51a8eebe847260f5ba2805210b608ded78353",
      extractedTextSha256:
        "8850fb19d67a89dd4b7e7078d9895d0f7350e2680fee9996c0d0cebe037d298c",
      scopeLimit:
        "民法典173只采用第2项；171四款读到，但履行、赔偿及过错比例不作为本包题目要求。",
    },
    {
      name: "general-provisions",
      title: "最高人民法院关于适用《中华人民共和国民法典》总则编若干问题的解释",
      recordId: "ff80818181cdceb30181d2c0af9e2339",
      statusCode: 3,
      statusLabel: "有效",
      observedAtUtc: "2026-10-05T04:38:40.162679+00:00",
      publicDetailUrl:
        "https://flk.npc.gov.cn/detail?id=ff80818181cdceb30181d2c0af9e2339&title=%E6%9C%80%E9%AB%98%E4%BA%BA%E6%B0%91%E6%B3%95%E9%99%A2%E5%85%B3%E4%BA%8E%E9%80%82%E7%94%A8%E3%80%8A%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E6%B0%91%E6%B3%95%E5%85%B8%E3%80%8B%E6%80%BB%E5%88%99%E7%BC%96%E8%8B%A5%E5%B9%B2%E9%97%AE%E9%A2%98%E7%9A%84%E8%A7%A3%E9%87%8A",
      documentSha256:
        "fc5891e547f7b1fd6ed917b10daadbaf487332b4948df394f78095b192641e1f",
      extractedTextSha256:
        "19f0c31e8af93814d6b62fa88bb0aaab8b27ccc0f0daad2e07dbb01916075f7d",
      scopeLimit:
        "采用28的两个条件及举证分配、29的到达规则、39的施行适用边界；不扩25—27或其他争议。",
    },
  ],
  scopeLimit:
    "仅本包所用代理条款；不证明民法整科、模型质量、正式接线或真人学习效果。",
  registeredInDefaultProduct: false,
} as const;

export const civilAgencyCurrentSources: ContentSources = Object.fromEntries(
  Object.entries(civilAgencySources).map(([id, source]) => {
    const record = civilAgencyCurrentSourceReview.records.find(
      (item) =>
        item.name ===
        (id.startsWith("civil-agency-interpretation-")
          ? "general-provisions"
          : "civil-code"),
    )!;
    const oldBoundary = civilAgencyPreparation.legalStatusBoundary;
    const prefix = source.note?.endsWith(oldBoundary)
      ? source.note.slice(0, -oldBoundary.length)
      : (source.note ?? "");
    return [
      id,
      {
        ...source,
        url: record.publicDetailUrl,
        note: `${prefix}2026-10-05独立法源审读取得人大法规库对应有效记录及官方附件，限本包所用条款。原冻结准备边界保留供追溯；当前候选默认未接线，保存恢复与模型效果未因此获验。`,
      },
    ];
  }),
);
