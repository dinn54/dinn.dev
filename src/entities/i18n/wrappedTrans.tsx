// components/WrappedTrans.tsx
'use client';

import React from 'react';
import { Trans } from 'react-i18next';
import { useI18n } from './i18nContext';

interface WrappedTransProps {
  i18nKey: string;
  children?: React.ReactNode;
}

export const WrappedTrans: React.FC<WrappedTransProps> = ({ i18nKey, children }) => {
  useI18n(); // 이는 컴포넌트가 언어 변경을 감지하도록 합니다
  return <Trans i18nKey={i18nKey}>{children}</Trans>;
};
