import React from 'react';
import { CodeEditor, Monaco } from '@grafana/ui';
import { promLanguageDefinition } from 'monaco-promql';

const LANGUAGE_ID = promLanguageDefinition.id;

const ensurePromLanguage = (monaco: Monaco) => {
  monaco.languages.register(promLanguageDefinition);
  monaco.languages.onLanguage(LANGUAGE_ID, () => {
    promLanguageDefinition.loader().then((mod) => {
      monaco.languages.setMonarchTokensProvider(LANGUAGE_ID, mod.language);
      monaco.languages.setLanguageConfiguration(LANGUAGE_ID, mod.languageConfiguration);
      monaco.languages.registerCompletionItemProvider(LANGUAGE_ID, mod.completionItemProvider);
    });
  });
};

interface PromeqlQueryProps {
  value: string;
  onChange: (value: string) => void;
}

const PromqlQuery: React.FC<PromeqlQueryProps> = ({ value = '', onChange }) => {
  return (
    <CodeEditor
      value={value}
      onChange={onChange}
      language={LANGUAGE_ID}
      height={32}
      monacoOptions={{
        minimap: { enabled: false },
        lineNumbers: 'off',
        lineHeight: 21,
        fontSize: 16,
      }}
      onBeforeEditorMount={(monaco) => {
        ensurePromLanguage(monaco);
      }}
      containerStyles="line-height: 21px; font-size: 16px;"
    />
  );
};

export default PromqlQuery;
