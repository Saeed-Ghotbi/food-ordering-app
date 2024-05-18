import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import WidgetSubscription from './widget-subscription';
import { footer } from '../data';
import cn from 'classnames';

interface WidgetsProps {
  lang: string;
  variant?: 'default' | 'medium';
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({
  lang,
  widgets,
  variant = 'default',
}) => {
  const { social } = footer;
  return (
    <div
      className={`${
        variant === 'default' &&
        'mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10'
      }`}
    >
      <div className="flex gap-5 sm:gap-9 max-sm:flex-col lg:gap-11 xl:gap-7 pb-[50px]">
        {widgets?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={widget}
            className="basis-1/3 max-sm:text-center max-sm:m-auto pb-3.5 sm:pb-0 col-span-1 md:col-span-2"
            lang={lang}
          />
        ))}
        <WidgetAbout
          social={social}
          className="text-center basis-1/3 mb-4 border-b col-span-full sm:col-span-1 md:col-span-3 sm:border-b-0 border-border-three sm:mb-0"
          lang={lang}
        />
        <div className="basis-1/3 h-24">
          <div className="w-24 h-24 bg-slate-600 m-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
