import { useDialogState } from "ariakit/dialog";
import { ArtistDetails } from "./ArtistDetails";
import { ArtistTrigger } from "./ArtistTrigger";

export default function ArtistDialog() {
  const dialog = useDialogState();
  return (
    <>
      <ArtistTrigger onClick={dialog.toggle} />
      <ArtistDetails dialog={dialog} />
    </>
  );
}
