import bookIcon from "@/assets/icons/topics.svg";
import bookLinesIcon from "@/assets/icons/book-lines.svg";
import checkIcon from "@/assets/icons/check.svg";
import dashboardIcon from "@/assets/icons/dashboard.svg";
import pencilIcon from "@/assets/icons/pencil.svg";
import playIcon from "@/assets/icons/play.svg";
import plusCircleIcon from "@/assets/icons/plus-circle.svg";
import questionIcon from "@/assets/icons/quiz.svg";
import warningIcon from "@/assets/icons/weak-spots.svg";

type IconProps = Readonly<{
  className?: string;
  strokeWidth?: number;
}>;

const IconAsset = ({ className, src }: { className?: string; src: string }) => {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={["inline-block shrink-0", className].filter(Boolean).join(" ")}
    />
  );
};

export const GridIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} src={dashboardIcon} />;
};

export const PlusCircleIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} src={plusCircleIcon} />;
};

export const PencilIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} src={pencilIcon} />;
};

export const CheckIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} src={checkIcon} />;
};

export const WarningTriangleIcon = ({
  className,
}: IconProps) => {
  return <IconAsset className={className} src={warningIcon} />;
};

export const QuizCircleIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} src={questionIcon} />;
};

export const PlayIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} src={playIcon} />;
};

export const BookOpenIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} src={bookIcon} />;
};

export const BookOpenLinesIcon = ({
  className,
}: IconProps) => {
  return <IconAsset className={className} src={bookLinesIcon} />;
};
