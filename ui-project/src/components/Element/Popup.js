import React from 'react';

import { Modal } from 'antd';

function info(obj, onOk) {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk,
  });
}

function success(obj, onOk) {
  Modal.success({
    title: obj.title,
    content: obj.content,
    onOk,
  });
}

function error(obj, onOk) {
  Modal.error({
    title: obj.title,
    content: obj.content,
    onOk,
  });
}

function warning(obj, onOk) {
  Modal.warning({
    title: obj.title,
    content: obj.content,
    onOk,
  });
}

export const PopUp = {
  info,
  success,
  error,
  warning,
};
