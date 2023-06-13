import styles from "./index.module.scss";
import React, { useCallback, useState } from "react";

export function ArtistBio({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      setExpanded(!expanded);
    },
    [expanded]
  );

  const onClickOnParagraph = useCallback(
    (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      setExpanded(!expanded);
    },
    [expanded]
  );

  const buttonText = expanded ? "Collapse" : "Expand";

  return (
    <div className={styles.artistDetails__bio}>
      <h2 className="sr-only">Biography</h2>
      <p
        className={styles.artistDetails__bio__text}
        data-testid="dialog-bio"
        data-expanded={expanded}
        onClick={onClickOnParagraph}
      >
        {description}
      </p>
      <button type="button" onClick={onClick} className={styles.artistDetails__bio__toggle}>
        {buttonText}
      </button>
    </div>
  );
}
