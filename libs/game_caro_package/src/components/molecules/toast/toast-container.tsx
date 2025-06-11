import { TToast } from 'game_caro_package/context-api';
import { ToastCard } from './toast-card';
import { TransitionAnimate } from '../transition-animate';

type TToastContainerProps = {
  toasts: TToast[];
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
};

const positionClasses: Record<
  'top-right' | 'top-left' | 'bottom-right' | 'bottom-left',
  string
> = {
  'top-right': 'fixed top-4 right-4',
  'top-left': 'fixed top-4 left-4',
  'bottom-right': 'fixed bottom-4 right-4',
  'bottom-left': 'fixed bottom-4 left-4',
};

export const ToastContainer: React.FC<TToastContainerProps> = ({
  toasts,
  position,
}) => {
  return (
    <ul
      className={`${positionClasses[position || 'bottom-left']} w-[275px] z-50`}
      style={{ listStyle: 'none', margin: 0, padding: 0 }}
    >
      {toasts.map((toast) => (
        <li key={toast.id} className="mb-3">
          <TransitionAnimate
            transitionProps={{
              mode: 'out-in',
            }}
            cssTransitionProps={{
              classNames: 'fade',
              key: toast.id,
            }}
          >
            <ToastCard {...toast} />
          </TransitionAnimate>
        </li>
      ))}
    </ul>
  );
};
