import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: Record<string, unknown>;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      {/* <div>
  <strong>Some unexpected error</strong>
  <p>Authentication for user failed</p>
</div> */}

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>

      {/* <Toast type="success" hasDescription={false}>
        <FiAlertCircle size={20} />

        <div>
          <strong>Some unexpected error</strong>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast type="error" hasDescription>
        <FiAlertCircle size={20} />

        <div>
          <strong>Some unexpected error</strong>
          <p>Authentication for user failed</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast> */}
    </Container>
  );
};

export default Toast;
