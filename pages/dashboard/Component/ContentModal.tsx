import { ActionModal, Button, FocusWrapper } from "components";
import { ICreateTaskInput } from "../form";
import { MdClose } from "react-icons/md";

import styles from '../dashboard.module.css'

type ContentModalProps = {
  onClose: () => void;
  isOpen: boolean;
  contentValue: string;
  titleValue: string;
  setTitlevalue: (title: string) => void;
  setContentValue: (content: string) => void;
  onCreateTaskSubmit: (data: ICreateTaskInput) => void;
  onSubmitModal: () => void;
};

export default function ContentModal({
  isOpen,
  onClose,
  contentValue,
  setContentValue,
  setTitlevalue,
  titleValue,
  onSubmitModal,
}: ContentModalProps) {
  return (
    <ActionModal isOpen={isOpen}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitModal();
            }}
          >
            <FocusWrapper style={{ flex: 1 }}>
              {(provided) => (
                <input
                  value={titleValue}
                  onChange={(event) => setTitlevalue(event.target.value)}
                  {...provided}
                  className={styles.titleInput}
                  placeholder="Input your title here"
                />
              )}
            </FocusWrapper>
            <FocusWrapper style={{ flex: 1, height: "60%" }}>
              {(provided) => (
                <textarea
                  value={contentValue}
                  onChange={(event) => setContentValue(event.target.value)}
                  {...provided}
                  placeholder="input your content here"
                  className={styles.contentTextArea}
                />
              )}
            </FocusWrapper>
            <input type={"submit"} />
          </form>
        </div>
        <Button onPress={onClose} type="link" style={{ marginLeft: "64px" }}>
          <MdClose size={24} />
        </Button>
      </div>
    </ActionModal>
  );
}