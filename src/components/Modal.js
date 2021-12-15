import classNames from 'classnames';
import Button from './Button';

export default function Modal({
  show,
  header,
  children,
  primaryText = 'Proceed',
  secondaryText = 'Cancel',
  onPrimaryClick = (e) => {},
  onSecondaryClick = (e) => {},
  onBackdropClick = (e) => {},
  onDefaultClose = (falseShowState) => {},
  closeOnBackdropClick = true,
  showSecondary = true,
  className,
}) {
  if (!show) return null;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" role="dialog">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          onClick={(e) => {
            onBackdropClick(e);
            if (closeOnBackdropClick) onDefaultClose(false);
          }}
          className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-all"
        ></div>
        <div
          className={classNames(
            'bg-white rounded shadow-xl z-20 transition-all my-2 sm:my-4 sm:max-w-4xl',
            className
          )}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onPrimaryClick(e);
              onDefaultClose(false);
            }}
          >
            <div className="p-6 pt-4 sm:p-8 sm:py-6">
              <div className="mt-4 sm:mt-0 ">
                <h3 className="text-lg font-medium text-center border-b pb-2 mb-4 sm:text-left">
                  {header}
                </h3>
                {children}
              </div>
            </div>
            <div className="pt-0 p-6 gap-y-2 gap-x-4 flex flex-col sm:flex-row-reverse">
              <Button type="submit" className="min-w-[6rem]" name="submit">
                {primaryText}
              </Button>
              {!!showSecondary && (
                <Button
                  onClick={(e) => {
                    onDefaultClose(false);
                    onSecondaryClick(e);
                  }}
                  type="button"
                  className="min-w-[6rem]"
                  variant="secondary"
                  name="secondary"
                >
                  {secondaryText}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
