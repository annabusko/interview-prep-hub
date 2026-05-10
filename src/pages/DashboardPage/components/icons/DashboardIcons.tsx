import BookSvg from "@/assets/icons/topics.svg?react";
import BookLinesSvg from "@/assets/icons/book-lines.svg?react";
import CheckSvg from "@/assets/icons/check.svg?react";
import DashboardSvg from "@/assets/icons/dashboard.svg?react";
import PencilSvg from "@/assets/icons/pencil.svg?react";
import PlaySvg from "@/assets/icons/play.svg?react";
import PlusCircleSvg from "@/assets/icons/plus-circle.svg?react";
import QuizSvg from "@/assets/icons/quiz.svg?react";
import WeakSpotsSvg from "@/assets/icons/weak-spots.svg?react";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type IconProps = Readonly<{
  className?: string;
}>;

type IconAssetProps = Readonly<{
  className?: string;
  Icon: IconComponent;
}>;

const IconAsset = ({ className, Icon }: IconAssetProps) => {
  return (
    <Icon
      aria-hidden="true"
      className={["h-4 w-4 shrink-0", className].filter(Boolean).join(" ")}
      focusable="false"
    />
  );
};

export const GridIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} Icon={DashboardSvg} />;
};

export const PlusCircleIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} Icon={PlusCircleSvg} />;
};

export const PencilIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} Icon={PencilSvg} />;
};

export const CheckIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} Icon={CheckSvg} />;
};

export const WarningTriangleIcon = ({
  className,
}: IconProps) => {
  return <IconAsset className={className} Icon={WeakSpotsSvg} />;
};

export const QuizCircleIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} Icon={QuizSvg} />;
};

export const PlayIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} Icon={PlaySvg} />;
};

export const BookOpenIcon = ({ className }: IconProps) => {
  return <IconAsset className={className} Icon={BookSvg} />;
};

export const BookOpenLinesIcon = ({
  className,
}: IconProps) => {
  return <IconAsset className={className} Icon={BookLinesSvg} />;
};
