
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import React, { Fragment, useEffect, useState, type SelectHTMLAttributes } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, ...restProps }: InputProps) => {
  return (
    <input
      {...restProps}
      className={cn(
        'bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm',
        className,
      )}
    />
  );
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string; disabled?: boolean }[];
}

export const Select = ({ className, options, ...restProps }: SelectProps) => {
  return (
    <select
      {...restProps}
      className={cn(
        'bg-light-secondary dark:bg-dark-secondary px-3 py-2 flex items-center overflow-hidden border border-light-200 dark:border-dark-200 dark:text-white rounded-lg text-sm',
        className,
      )}
    >
      {options.map(({ label, value, disabled }) => {
        return (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

interface ChatModelType {
  chatModelProviders: {
    [key: string]: [Record<string, any>];
  };
}

const ChatModel = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [config, setConfig] = useState<ChatModelType | null>(null);
  const [chatModels, setChatModels] = useState<Record<string, any>>({});
  const [selectedChatModelProvider, setSelectedChatModelProvider] = useState<
    string | null
  >(null);
  const [selectedChatModel, setSelectedChatModel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchConfig = async () => {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/config`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = (await res.json()) as ChatModelType;
        setConfig(data);

        const chatModelProvidersKeys = Object.keys(data.chatModelProviders || {});
        const defaultChatModelProvider =
          chatModelProvidersKeys.length > 0 ? chatModelProvidersKeys[0] : '';

        const chatModelProvider =
          localStorage.getItem('chatModelProvider') || defaultChatModelProvider || '';
        const chatModel =
          localStorage.getItem('chatModel') ||
          (data.chatModelProviders && data.chatModelProviders[chatModelProvider]?.length > 0
            ? data.chatModelProviders[chatModelProvider][0].name
            : '') ||
          '';

        setSelectedChatModelProvider(chatModelProvider);
        setSelectedChatModel(chatModel);
        setChatModels(data.chatModelProviders || {});
        setIsLoading(false);
      };

      fetchConfig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSubmit = async () => {
    setIsUpdating(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      localStorage.setItem('chatModelProvider', selectedChatModelProvider!);
      localStorage.setItem('chatModel', selectedChatModel!);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
      setIsOpen(false);
      window.location.reload();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/50 dark:bg-black/50" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-200"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform rounded-2xl bg-light-secondary dark:bg-dark-secondary border border-light-200 dark:border-dark-200 p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle className="text-sm font-medium leading-6 dark:text-white">
                 
                </DialogTitle>
                {config && !isLoading && (
                  <div className="flex flex-col space-y-4 mt-0">
                    {config.chatModelProviders && (
                      <div className="flex flex-col space-y-1">
                        {/* <Select
                          value={selectedChatModelProvider ?? undefined}
                          onChange={(e) => {
                            setSelectedChatModelProvider(e.target.value);
                            setSelectedChatModel(
                              config.chatModelProviders[e.target.value][0].name,
                            );
                          }}
                          options={Object.keys(config.chatModelProviders).map((provider) => ({
                            value: provider,
                            label: provider.charAt(0).toUpperCase() + provider.slice(1),
                          }))}
                        /> */}
                      </div>
                    )}
                    {selectedChatModelProvider && (
                      <div className="flex flex-col space-y-1">
                        <p className="text-black/70 dark:text-white/70 text-sm">
                          Chat Model
                        </p>
                        <Select
                          value={selectedChatModel ?? undefined}
                          onChange={(e) => setSelectedChatModel(e.target.value)}
                          options={(() => {
                            const chatModelProvider =
                              config.chatModelProviders[selectedChatModelProvider];

                            return chatModelProvider
                              ? chatModelProvider.length > 0
                                ? chatModelProvider.map((model) => ({
                                    value: model.name,
                                    label: model.displayName,
                                  }))
                                : [
                                    {
                                      value: '',
                                      label: 'No models available',
                                      disabled: true,
                                    },
                                  ]
                              : [
                                  {
                                    value: '',
                                    label: 'Invalid provider, please check backend logs',
                                    disabled: true,
                                  },
                                ];
                          })()}
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  {/* <button
                    onClick={handleSubmit}
                    disabled={isUpdating}
                    className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg disabled:opacity-50"
                  >
                    {isUpdating ? 'Saving...' : 'Save'}
                  </button> */}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChatModel;
