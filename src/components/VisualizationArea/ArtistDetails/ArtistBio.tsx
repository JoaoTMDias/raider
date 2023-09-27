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
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      setExpanded(!expanded);
    },
    [expanded]
  );

  const buttonText = expanded ? "Collapse" : "Expand";

  return (
    <div
      className={styles.artistDetails__bio}
      onClick={onClickOnParagraph}
      data-testid="dialog-bio"
    >
      <h2 className="sr-only" data-testid="dialog-bio-title">
        Biography
      </h2>
      <p
        className={styles.artistDetails__bio__text}
        data-expanded={expanded}
        data-testid="dialog-bio-description"
      >
        {description}
      </p>
      <button
        type="button"
        onClick={onClick}
        className={styles.artistDetails__bio__toggle}
        data-testid="dialog-bio-button"
      >
        {buttonText}
      </button>
    </div>
  );
}
