"use client";

import Modal from "./Modal";
import { TriangleMark } from "./Prism";

type WelcomeModalProps = {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
};

/** 첫 방문 환영 팝업 */
export default function WelcomeModal({
  open,
  onClose,
  onApply,
}: WelcomeModalProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="welcome-title">
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-hairline">
          <TriangleMark size={18} />
        </div>
        <h2
          id="welcome-title"
          className="text-[24px] font-medium leading-[1.25] tracking-[-0.04em] text-graphite"
        >
          당신의 부서는 AI가 필요하신가요?
        </h2>
        <p className="mt-3 text-[15px] leading-[1.55] tracking-[-0.02em] text-felt-gray">
          편하게 이야기해주세요! 어떤 업무가 반복되고 번거로운지 적어주시면
          됩니다.
        </p>
        <div className="mt-7 flex w-full items-center justify-center gap-3">
          <button className="btn-filled" onClick={onApply}>
            신청하기
          </button>
          <button className="btn-outline" onClick={onClose}>
            둘러보기
          </button>
        </div>
      </div>
    </Modal>
  );
}
