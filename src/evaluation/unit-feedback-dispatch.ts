import {
  REGISTERED_OBJECTIVE_READING_REFERENCE_VERSION,
  prepareRegisteredObjectiveReadingReference,
  presentRegisteredObjectiveReadingReference,
} from "./registered-objective-reading-reference";
import {
  REGISTERED_CONCISE_TEACHING_VERSION,
  prepareRegisteredConciseTeaching,
  presentRegisteredConciseTeaching,
} from "./registered-concise-teaching";
import {
  REGISTERED_READING_REFERENCE_VERSION,
  prepareRegisteredReadingReference,
  presentRegisteredReadingReference,
} from "./registered-reading-reference";
import {
  REGISTERED_CLEAR_FEEDBACK_VERSION,
  prepareRegisteredClearFeedback,
  presentRegisteredClearFeedback,
  REGISTERED_TEACHER_VOICE_VERSION,
  prepareRegisteredTeacherVoice,
  presentRegisteredTeacherVoice,
} from "./registered-clear-feedback";
import {
  REGISTERED_DIRECT_TEACHING_VERSION,
  prepareRegisteredDirectTeaching,
  presentRegisteredDirectTeaching,
} from "./registered-direct-teaching";
import {
  REGISTERED_STRICT_OUTPUT_CANDIDATE_VERSION,
  prepareRegisteredStrictOutputCandidate,
  presentRegisteredStrictOutputCandidate,
} from "./registered-strict-output-candidate";
import {
  REGISTERED_STANCE_BOUNDARY_CANDIDATE_VERSION,
  prepareRegisteredStanceBoundaryCandidate,
} from "./registered-stance-boundary-candidate";
import {
  REGISTERED_OVERALL_V5_VERSION,
  prepareRegisteredOverallTeachingV5,
} from "./registered-overall-teaching-v5";
import {
  REGISTERED_OVERALL_V4_VERSION,
  prepareRegisteredOverallTeachingV4,
} from "./registered-overall-teaching-v4";
import {
  REGISTERED_OVERALL_V3_VERSION,
  prepareRegisteredOverallTeachingV3,
  presentRegisteredOverallTeachingV3,
} from "./registered-overall-teaching-v3";
import {
  REGISTERED_OVERALL_TEACHING_VERSION,
  prepareRegisteredOverallTeaching,
  presentRegisteredOverallTeaching,
} from "./registered-overall-teaching";
import {
  TEACHER_SOURCE_PROTOCOL,
  TEACHER_SOURCE_CODE_PROTOCOL,
  TEACHER_SOURCE_STRICT_PROTOCOL,
  TEACHER_SOURCE_PRIORITY_PROTOCOL,
  TEACHER_SOURCE_DIALOGUE_PROTOCOL,
  TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL,
  TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL,
  TEACHER_SOURCE_PLAIN_PROTOCOL,
  TEACHER_SOURCE_TEACHING_PROTOCOL,
  TEACHER_SOURCE_POINT_PROTOCOL,
  TEACHER_SOURCE_DIRECT_LANGUAGE_PROTOCOL,
  TEACHER_SOURCE_FOCUSED_PROTOCOL,
  TEACHER_SOURCE_DECISION_PROTOCOL,
  TEACHER_SOURCE_REASONING_PROTOCOL,
  TEACHER_SOURCE_AUDIENCE_PROTOCOL,
  TEACHER_SOURCE_PROPORTIONATE_PROTOCOL,
  TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL,
  isStrictTeacherProtocol,
} from "../domain/teacher-source-feedback-contract";
import {
  prepareSourceTeacherTask,
  sourceTeacherRequestBody,
  presentSourceTeacherReply,
} from "./unit-feedback-source-teacher-protocol";
import { createHash } from "node:crypto";
import { parseUniqueJson } from "./unique-json";
import {
  REGISTERED_TEACHING_VERSION,
  REGISTERED_TEACHING_STYLE,
  prepareRegisteredTeaching,
  supportsRegisteredTeaching,
} from "./registered-teaching";
import {
  UNIT_FEEDBACK_VERSION,
  presentUnitFeedback,
  presentRegisteredFeedbackText,
  unitFeedbackRequestBody,
  type UnitFeedbackTask,
} from "./unit-feedback";
import {
  SCOPE_CANDIDATE_VERSION,
  prepareScopeCandidate,
  scopeCandidateRequestBody,
  checkScopeCandidate,
} from "./unit-feedback-scope-candidate";

export const SCOPED_UNIT_FEEDBACK_VERSION = SCOPE_CANDIDATE_VERSION;
export type UnitFeedbackDispatchProtocol =
  | typeof REGISTERED_OBJECTIVE_READING_REFERENCE_VERSION
  | typeof REGISTERED_CONCISE_TEACHING_VERSION
  | typeof REGISTERED_READING_REFERENCE_VERSION
  | typeof REGISTERED_TEACHER_VOICE_VERSION
  | typeof REGISTERED_CLEAR_FEEDBACK_VERSION
  | typeof REGISTERED_DIRECT_TEACHING_VERSION
  | typeof REGISTERED_STRICT_OUTPUT_CANDIDATE_VERSION
  | typeof REGISTERED_STANCE_BOUNDARY_CANDIDATE_VERSION
  | typeof UNIT_FEEDBACK_VERSION
  | typeof REGISTERED_TEACHING_VERSION
  | typeof REGISTERED_OVERALL_TEACHING_VERSION
  | typeof REGISTERED_OVERALL_V3_VERSION
  | typeof REGISTERED_OVERALL_V4_VERSION
  | typeof REGISTERED_OVERALL_V5_VERSION
  | typeof SCOPE_CANDIDATE_VERSION
  | typeof TEACHER_SOURCE_PROTOCOL
  | typeof TEACHER_SOURCE_CODE_PROTOCOL
  | typeof TEACHER_SOURCE_STRICT_PROTOCOL
  | typeof TEACHER_SOURCE_PRIORITY_PROTOCOL
  | typeof TEACHER_SOURCE_DIALOGUE_PROTOCOL
  | typeof TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL
  | typeof TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL
  | typeof TEACHER_SOURCE_PLAIN_PROTOCOL
  | typeof TEACHER_SOURCE_TEACHING_PROTOCOL
  | typeof TEACHER_SOURCE_POINT_PROTOCOL
  | typeof TEACHER_SOURCE_DIRECT_LANGUAGE_PROTOCOL
  | typeof TEACHER_SOURCE_FOCUSED_PROTOCOL
  | typeof TEACHER_SOURCE_DECISION_PROTOCOL
  | typeof TEACHER_SOURCE_REASONING_PROTOCOL
  | typeof TEACHER_SOURCE_AUDIENCE_PROTOCOL
  | typeof TEACHER_SOURCE_PROPORTIONATE_PROTOCOL
  | typeof TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL;
export const scopedUnitFeedbackQuestionIds: readonly string[] = [
  "cl14-flight-no-serious-result",
  "cl14-rail-unrelated-accident",
];
const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");

/** Explicit server-owned protocol choice; no activation or paid permission here. */
export function prepareUnitFeedbackDispatch(
  task: UnitFeedbackTask,
  protocol: UnitFeedbackDispatchProtocol = UNIT_FEEDBACK_VERSION,
) {
  if (protocol === REGISTERED_OBJECTIVE_READING_REFERENCE_VERSION)
    return prepareRegisteredObjectiveReadingReference(task);
  if (protocol === REGISTERED_CONCISE_TEACHING_VERSION)
    return prepareRegisteredConciseTeaching(task);
  if (protocol === REGISTERED_READING_REFERENCE_VERSION)
    return prepareRegisteredReadingReference(task);
  if (protocol === REGISTERED_TEACHER_VOICE_VERSION)
    return prepareRegisteredTeacherVoice(task);
  if (protocol === REGISTERED_CLEAR_FEEDBACK_VERSION)
    return prepareRegisteredClearFeedback(task);
  if (protocol === REGISTERED_DIRECT_TEACHING_VERSION)
    return prepareRegisteredDirectTeaching(task);
  if (protocol === REGISTERED_STRICT_OUTPUT_CANDIDATE_VERSION)
    return prepareRegisteredStrictOutputCandidate(task);
  if (protocol === REGISTERED_STANCE_BOUNDARY_CANDIDATE_VERSION)
    return prepareRegisteredStanceBoundaryCandidate(task);
  if (protocol === REGISTERED_OVERALL_V5_VERSION)
    return prepareRegisteredOverallTeachingV5(task);
  if (protocol === REGISTERED_OVERALL_V4_VERSION)
    return prepareRegisteredOverallTeachingV4(task);
  if (protocol === REGISTERED_OVERALL_V3_VERSION)
    return prepareRegisteredOverallTeachingV3(task);
  if (protocol === REGISTERED_OVERALL_TEACHING_VERSION)
    return prepareRegisteredOverallTeaching(task);
  if (protocol === REGISTERED_TEACHING_VERSION)
    return prepareRegisteredTeaching(task);
  if (
    protocol === TEACHER_SOURCE_PROTOCOL ||
    protocol === TEACHER_SOURCE_CODE_PROTOCOL ||
    protocol === TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL ||
    protocol === TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL ||
    protocol === TEACHER_SOURCE_PLAIN_PROTOCOL ||
    protocol === TEACHER_SOURCE_TEACHING_PROTOCOL ||
    protocol === TEACHER_SOURCE_POINT_PROTOCOL ||
    protocol === TEACHER_SOURCE_DIRECT_LANGUAGE_PROTOCOL ||
    protocol === TEACHER_SOURCE_FOCUSED_PROTOCOL ||
    protocol === TEACHER_SOURCE_DECISION_PROTOCOL ||
    protocol === TEACHER_SOURCE_REASONING_PROTOCOL ||
    protocol === TEACHER_SOURCE_AUDIENCE_PROTOCOL ||
    protocol === TEACHER_SOURCE_PROPORTIONATE_PROTOCOL ||
    protocol === TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL ||
    isStrictTeacherProtocol(protocol)
  ) {
    const candidate = prepareSourceTeacherTask(task, protocol);
    return {
      protocol,
      taskId: candidate.taskId,
      body: sourceTeacherRequestBody(candidate),
    };
  }
  if (protocol === UNIT_FEEDBACK_VERSION)
    return {
      protocol,
      taskId: task.taskId,
      body: unitFeedbackRequestBody(task),
    };
  if (
    protocol !== SCOPE_CANDIDATE_VERSION ||
    !scopedUnitFeedbackQuestionIds.includes(task.input.caseId)
  )
    throw Error("unit-scoped-dispatch-range");
  // The frozen candidate verifies current content, every criterion and scope.
  const scoped = prepareScopeCandidate(task);
  return {
    protocol,
    taskId: scoped.taskId,
    body: scopeCandidateRequestBody(scoped),
  };
}

/** Both old and new saved receipts remain readable, even without an active grant. */
export function unitFeedbackArchiveBodyMatches(
  task: UnitFeedbackTask,
  savedHash: string,
  currentHash: string,
) {
  const nativeHash = digest(unitFeedbackRequestBody(task));
  if (savedHash === nativeHash && currentHash === nativeHash) return true;
  const hashes = [nativeHash];
  if (task.objective) {
    try {
      hashes.push(prepareRegisteredObjectiveReadingReference(task).bodySHA256);
    } catch {
      // A missing new reading edition must not disable historical native reads.
    }
  }
  if (supportsRegisteredTeaching(task))
    hashes.push(
      digest(prepareRegisteredTeaching(task).body),
      digest(prepareRegisteredOverallTeaching(task).body),
      digest(prepareRegisteredOverallTeachingV3(task).body),
      digest(prepareRegisteredOverallTeachingV4(task).body),
      digest(prepareRegisteredOverallTeachingV5(task).body),
      digest(prepareRegisteredStanceBoundaryCandidate(task).body),
    );
  // A disabled/broken new candidate must not prevent a known historical hash
  // from being read. An unconstructable strict hash remains unrecognized.
  if (supportsRegisteredTeaching(task)) {
    try {
      hashes.push(digest(prepareRegisteredStrictOutputCandidate(task).body));
    } catch {
      // Explicit strict dispatch still fails closed; no legacy hash is widened.
    }
    try {
      hashes.push(digest(prepareRegisteredDirectTeaching(task).body));
    } catch {
      // A new protocol failure must not prevent reading known historical bodies.
    }
    try {
      hashes.push(digest(prepareRegisteredClearFeedback(task).body));
    } catch {
      // A writing candidate must not block known historical receipts.
    }
    try {
      hashes.push(digest(prepareRegisteredTeacherVoice(task).body));
    } catch {
      // Voice-only experiments do not prevent historical reads.
    }
    try {
      hashes.push(digest(prepareRegisteredReadingReference(task).body));
    } catch {
      // Editorial reference changes are scoped to explicitly matched editions.
    }
    try {
      hashes.push(digest(prepareRegisteredConciseTeaching(task).body));
    } catch {
      /* keep historical readers */
    }
  }
  if (scopedUnitFeedbackQuestionIds.includes(task.input.caseId))
    hashes.push(
      digest(prepareUnitFeedbackDispatch(task, SCOPE_CANDIDATE_VERSION).body),
    );
  try {
    hashes.push(
      digest(prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_PROTOCOL).body),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_CODE_PROTOCOL).body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_STRICT_PROTOCOL).body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_PRIORITY_PROTOCOL)
          .body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_DIALOGUE_PROTOCOL)
          .body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL)
          .body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(
          task,
          TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL,
        ).body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_PLAIN_PROTOCOL).body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_TEACHING_PROTOCOL)
          .body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_POINT_PROTOCOL).body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(
          task,
          TEACHER_SOURCE_DIRECT_LANGUAGE_PROTOCOL,
        ).body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_FOCUSED_PROTOCOL).body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_DECISION_PROTOCOL)
          .body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_REASONING_PROTOCOL)
          .body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_AUDIENCE_PROTOCOL)
          .body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(task, TEACHER_SOURCE_PROPORTIONATE_PROTOCOL)
          .body,
      ),
    );
    hashes.push(
      digest(
        prepareUnitFeedbackDispatch(
          task,
          TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL,
        ).body,
      ),
    );
  } catch {
    /* Native and unsupported definitions retain their existing reader. */
  }
  return hashes.includes(savedHash) && hashes.includes(currentHash);
}

/** Project model-native labels into the existing view; retain the raw v2 text. */
export function presentUnitFeedbackReceipt(
  task: UnitFeedbackTask,
  text: string,
  trustedRequestBodyHash?: string,
) {
  if (task.registeredModelRequest) {
    if (task.objective && trustedRequestBodyHash) {
      let reading:
        | ReturnType<typeof prepareRegisteredObjectiveReadingReference>
        | undefined;
      try {
        reading = prepareRegisteredObjectiveReadingReference(task);
      } catch {
        // Old objective receipts use their original native body and decoder.
      }
      if (reading?.bodySHA256 === trustedRequestBodyHash)
        return {
          protocol: reading.protocol,
          candidateTaskId: reading.taskId,
          requestBodyHash: reading.bodySHA256,
          maxOutputTokens: reading.body.max_tokens,
          view: presentRegisteredObjectiveReadingReference(task, text, reading)
            .feedback,
        };
    }
    if (supportsRegisteredTeaching(task) && trustedRequestBodyHash) {
      const stance = prepareRegisteredStanceBoundaryCandidate(task);
      if (digest(stance.body) === trustedRequestBodyHash)
        return {
          protocol: REGISTERED_STANCE_BOUNDARY_CANDIDATE_VERSION,
          candidateTaskId: stance.taskId,
          requestBodyHash: digest(stance.body),
          maxOutputTokens: stance.body.max_tokens,
          view: presentRegisteredOverallTeachingV3(task, text),
        };
      const quoted = prepareRegisteredOverallTeachingV5(task);
      if (digest(quoted.body) === trustedRequestBodyHash)
        return {
          protocol: REGISTERED_OVERALL_V5_VERSION,
          candidateTaskId: quoted.taskId,
          requestBodyHash: digest(quoted.body),
          maxOutputTokens: quoted.body.max_tokens,
          view: presentRegisteredOverallTeachingV3(task, text),
        };
      const concise = prepareRegisteredOverallTeachingV4(task);
      if (digest(concise.body) === trustedRequestBodyHash)
        return {
          protocol: REGISTERED_OVERALL_V4_VERSION,
          candidateTaskId: concise.taskId,
          requestBodyHash: digest(concise.body),
          maxOutputTokens: concise.body.max_tokens,
          view: presentRegisteredOverallTeachingV3(task, text),
        };
      const coherent = prepareRegisteredOverallTeachingV3(task);
      if (digest(coherent.body) === trustedRequestBodyHash)
        return {
          protocol: REGISTERED_OVERALL_V3_VERSION,
          candidateTaskId: coherent.taskId,
          requestBodyHash: digest(coherent.body),
          maxOutputTokens: coherent.body.max_tokens,
          view: presentRegisteredOverallTeachingV3(task, text),
        };
      const overall = prepareRegisteredOverallTeaching(task);
      if (digest(overall.body) === trustedRequestBodyHash)
        return {
          protocol: REGISTERED_OVERALL_TEACHING_VERSION,
          candidateTaskId: overall.taskId,
          requestBodyHash: digest(overall.body),
          maxOutputTokens: overall.body.max_tokens,
          view: presentRegisteredOverallTeaching(task, text),
        };
      const teaching = prepareRegisteredTeaching(task);
      if (digest(teaching.body) === trustedRequestBodyHash)
        return {
          protocol: REGISTERED_TEACHING_VERSION,
          candidateTaskId: teaching.taskId,
          requestBodyHash: digest(teaching.body),
          maxOutputTokens: teaching.body.max_tokens,
          view: {
            ...presentRegisteredFeedbackText(task, text),
            teachingStyle: REGISTERED_TEACHING_STYLE,
          },
        };
      const strict = prepareRegisteredStrictOutputCandidate(task);
      if (strict.bodySHA256 === trustedRequestBodyHash)
        return {
          protocol: strict.protocol,
          candidateTaskId: strict.taskId,
          requestBodyHash: strict.bodySHA256,
          maxOutputTokens: strict.body.max_tokens,
          view: presentRegisteredStrictOutputCandidate(task, text, strict)
            .feedback,
        };
      const direct = prepareRegisteredDirectTeaching(task);
      if (direct.bodySHA256 === trustedRequestBodyHash)
        return {
          protocol: direct.protocol,
          candidateTaskId: direct.taskId,
          requestBodyHash: direct.bodySHA256,
          maxOutputTokens: direct.body.max_tokens,
          view: presentRegisteredDirectTeaching(task, text, direct).feedback,
        };
      let clear: ReturnType<typeof prepareRegisteredClearFeedback> | undefined;
      try {
        clear = prepareRegisteredClearFeedback(task);
      } catch {
        // Preserve historical readers if the new builder cannot be constructed.
      }
      if (clear?.bodySHA256 === trustedRequestBodyHash)
        return {
          protocol: clear.protocol,
          candidateTaskId: clear.taskId,
          requestBodyHash: clear.bodySHA256,
          maxOutputTokens: clear.body.max_tokens,
          view: presentRegisteredClearFeedback(task, text, clear).feedback,
        };
      let conciseReading:
        ReturnType<typeof prepareRegisteredConciseTeaching> | undefined;
      try {
        conciseReading = prepareRegisteredConciseTeaching(task);
      } catch {
        /* keep older readers */
      }
      if (conciseReading?.bodySHA256 === trustedRequestBodyHash)
        return {
          protocol: conciseReading.protocol,
          candidateTaskId: conciseReading.taskId,
          requestBodyHash: conciseReading.bodySHA256,
          maxOutputTokens: conciseReading.body.max_tokens,
          view: presentRegisteredConciseTeaching(task, text, conciseReading)
            .feedback,
        };
      let reading:
        ReturnType<typeof prepareRegisteredReadingReference> | undefined;
      try {
        reading = prepareRegisteredReadingReference(task);
      } catch {
        /* preserve older readers */
      }
      if (reading?.bodySHA256 === trustedRequestBodyHash)
        return {
          protocol: reading.protocol,
          candidateTaskId: reading.taskId,
          requestBodyHash: reading.bodySHA256,
          maxOutputTokens: reading.body.max_tokens,
          view: presentRegisteredReadingReference(task, text, reading).feedback,
        };
      let voice: ReturnType<typeof prepareRegisteredTeacherVoice> | undefined;
      try {
        voice = prepareRegisteredTeacherVoice(task);
      } catch {
        /* preserve older readers */
      }
      if (voice?.bodySHA256 === trustedRequestBodyHash)
        return {
          protocol: voice.protocol,
          candidateTaskId: voice.taskId,
          requestBodyHash: voice.bodySHA256,
          maxOutputTokens: voice.body.max_tokens,
          view: presentRegisteredTeacherVoice(task, text, voice).feedback,
        };
    }
    const body = unitFeedbackRequestBody(task);
    return {
      protocol: UNIT_FEEDBACK_VERSION,
      candidateTaskId: null,
      requestBodyHash: digest(body),
      maxOutputTokens: body.max_tokens,
      view: presentRegisteredFeedbackText(task, text),
    };
  }
  // v2.9 carries no model-authored identity. Select it only from the trusted
  // stored/sent body hash, never from response shape, guessed fields or defaults.
  let teachingTask: ReturnType<typeof prepareSourceTeacherTask> | null = null;
  if (trustedRequestBodyHash) {
    try {
      for (const version of [
        TEACHER_SOURCE_TEACHING_PROTOCOL,
        TEACHER_SOURCE_POINT_PROTOCOL,
        TEACHER_SOURCE_DIRECT_LANGUAGE_PROTOCOL,
        TEACHER_SOURCE_FOCUSED_PROTOCOL,
        TEACHER_SOURCE_DECISION_PROTOCOL,
        TEACHER_SOURCE_REASONING_PROTOCOL,
        TEACHER_SOURCE_AUDIENCE_PROTOCOL,
        TEACHER_SOURCE_PROPORTIONATE_PROTOCOL,
        TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL,
      ] as const) {
        const candidate = prepareSourceTeacherTask(task, version);
        if (
          digest(sourceTeacherRequestBody(candidate)) === trustedRequestBodyHash
        ) {
          teachingTask = candidate;
          break;
        }
      }
    } catch {
      // Non-teacher/unsupported definitions keep their exact prior reader.
    }
  }
  if (teachingTask) {
    const checked = presentSourceTeacherReply(
      teachingTask,
      parseUniqueJson(text),
    );
    const body = sourceTeacherRequestBody(teachingTask);
    return {
      protocol: teachingTask.version,
      candidateTaskId: teachingTask.taskId,
      requestBodyHash: digest(body),
      maxOutputTokens: body.max_tokens,
      view: checked.view,
      sourceTeacher: checked.sourceTeacher,
    };
  }
  const raw: unknown = JSON.parse(text);
  if (
    typeof raw === "object" &&
    raw !== null &&
    "version" in raw &&
    (raw.version === TEACHER_SOURCE_PROTOCOL ||
      raw.version === TEACHER_SOURCE_CODE_PROTOCOL ||
      raw.version === TEACHER_SOURCE_STRICT_PROTOCOL ||
      raw.version === TEACHER_SOURCE_PRIORITY_PROTOCOL ||
      raw.version === TEACHER_SOURCE_DIALOGUE_PROTOCOL ||
      raw.version === TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL ||
      raw.version === TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL ||
      raw.version === TEACHER_SOURCE_PLAIN_PROTOCOL)
  ) {
    const candidate = prepareSourceTeacherTask(task, raw.version);
    const checked = presentSourceTeacherReply(
      candidate,
      isStrictTeacherProtocol(raw.version) ||
        raw.version === TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL ||
        raw.version === TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL ||
        raw.version === TEACHER_SOURCE_PLAIN_PROTOCOL
        ? parseUniqueJson(text)
        : raw,
    );
    const body = sourceTeacherRequestBody(candidate);
    return {
      protocol: candidate.version,
      candidateTaskId: candidate.taskId,
      requestBodyHash: digest(body),
      maxOutputTokens: body.max_tokens,
      view: checked.view,
      sourceTeacher: checked.sourceTeacher,
    };
  }
  const scoped =
    typeof raw === "object" &&
    raw !== null &&
    "version" in raw &&
    raw.version === SCOPE_CANDIDATE_VERSION;
  if (scoped) {
    const candidate = prepareScopeCandidate(task);
    const checked = checkScopeCandidate(candidate, raw);
    const body = scopeCandidateRequestBody(candidate);
    return {
      protocol: SCOPE_CANDIDATE_VERSION,
      candidateTaskId: candidate.taskId,
      requestBodyHash: digest(body),
      maxOutputTokens: body.max_tokens,
      // This is a presentation projection, not an override of any model label.
      view: presentUnitFeedback(task, {
        taskId: task.taskId,
        result: checked.reply.result,
      }),
    };
  }
  const body = unitFeedbackRequestBody(task);
  return {
    protocol: UNIT_FEEDBACK_VERSION,
    candidateTaskId: null,
    requestBodyHash: digest(body),
    maxOutputTokens: body.max_tokens,
    view: presentUnitFeedback(task, { taskId: task.taskId, result: raw }),
  };
}
