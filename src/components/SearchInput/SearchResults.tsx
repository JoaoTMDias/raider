import { RoverProvider, useRover, useFocus } from "@feedzai/react-a11y-tools";
import Image from "next/image";
import { useRef, useId } from "react";
import styles from "./index.module.scss";

const DUMMY_ITEMS = [
  {
    img: "https://i.scdn.co/image/ab6761610000f1784f7d049994ac00ed885bfbf2",
    name: "blackbear",
  },
  {
    img: "https://i.scdn.co/image/ab6761610000f178c9690bc711d04b3d4fd4b87c",
    name: "BLACKPINK",
  },
  {
    img: "https://i.scdn.co/image/ab6761610000f1784bd22c1711d22aa647a61097",
    name: "Kodak Black",
  },
  {
    img: "https://i.scdn.co/image/ab6761610000f178196f5af772aeb1bdd3a6be65",
    name: "(G)I-DLE",
  },
  {
    img: "https://i.scdn.co/image/ab6761610000f1780c2516a5c67b019c984c80ee",
    name: "bLAck pARty",
  },
  {
    img: "https://i.scdn.co/image/ab6761610000f178abab30b094128cf4c0f2cef1",
    name: "Black Eyed Peas",
  },
  {
    img: "https://i.scdn.co/image/ab6761610000f17837362b96be798b82ae24c911",
    name: "Jessi",
  },
  {
    img: "https://i.scdn.co/image/ab6761610000f178a5617d3e411ff2856a91ddf3",
    name: "Black Sabbath",
  },
  {
    img: "https://i.scdn.co/image/ab6761610000f178c9690bc711d04b3d4fd4b87c",
    name: "Blackpanda",
  },
];

interface ResultItemProps {
  img?: string;
  name: string;
  posInset: number;
  totalLength: number;
}

function ResultItem({ img, name, posInset, totalLength }: ResultItemProps): JSX.Element {
  const generatedId = useId();
  const itemRef = useRef(null);

  const [tabIndex, focused, handleKeyDown, handleClick] = useRover(itemRef, false);

  useFocus(itemRef, focused);

  return (
    <li
      ref={itemRef}
      aria-selected={tabIndex === 0}
      className={styles.search__result}
      id={generatedId}
      role="option"
      tabIndex={tabIndex}
      aria-posinset={posInset}
      aria-setsize={totalLength}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      {img && <Image src={img} width="24" height="24" alt="" />}
      <span className={styles.search__result__name}>{name}</span>
    </li>
  );
}

function SearchResults() {
  const renderItems = () => {
    const list = DUMMY_ITEMS.map((item, index) => {
      const posInset = index + 1;
      const totalLength = DUMMY_ITEMS.length;
      return <ResultItem key={index} {...item} posInset={posInset} totalLength={totalLength} />;
    });

    return <>{list}</>;
  };

  return (
    <RoverProvider direction="vertical">
      <ul className={styles.search__results} id="raider-search-results" role="listbox">
        {renderItems()}
      </ul>
    </RoverProvider>
  );
}

export default SearchResults;
