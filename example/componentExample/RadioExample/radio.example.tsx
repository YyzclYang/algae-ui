import React from 'react';
import { CodeDemo } from '../CommonDispalyComponents';
import { Api } from '../CommonDispalyComponents';
import './radio.example.scss';

import CodeDemo1 from './radio.codeDemo1';
const code1 = require('!!raw-loader!./radio.codeDemo1.tsx');
import CodeDemo2 from './radio.codeDemo2';
const code2 = require('!!raw-loader!./radio.codeDemo2.tsx');
import CodeDemo3 from './radio.codeDemo3';
const code3 = require('!!raw-loader!./radio.codeDemo3.tsx');
import CodeDemo4 from './radio.codeDemo4';
const code4 = require('!!raw-loader!./radio.codeDemo4.tsx');
import CodeDemo5 from './radio.codeDemo5';
const code5 = require('!!raw-loader!./radio.codeDemo5.tsx');

const RadioExample: React.FunctionComponent = () => {
  return (
    <div className="radio-example-page">
      <section>
        <h1>Radio 单选框</h1>
        <p>单选框</p>
      </section>
      <section>
        <h2>何时使用</h2>
        <p>用于在多个备选项中选中单个状态。</p>
      </section>
      <section>
        <h2>代码演示</h2>
        <div className="code-demonstration">
          <div className="code-demo-column">
            <CodeDemo
              title="基础"
              content={<p>最基础的用法</p>}
              code={code1.default}
            >
              <CodeDemo1 />
            </CodeDemo>
            <CodeDemo
              title="RadioGroup"
              content={<p>一组互斥的 Radio 配合使用。</p>}
              code={code3.default}
            >
              <CodeDemo3 />
            </CodeDemo>
            <CodeDemo
              title="RadioGroup 配置模式"
              content={
                <p>
                  通过配置<code>options</code>参数来渲染<code>RadioGroup</code>
                </p>
              }
              code={code5.default}
            >
              <CodeDemo5 />
            </CodeDemo>
          </div>
          <div className="code-demo-column">
            <CodeDemo
              title="不可用"
              content={<p>Radio 不可用的状态</p>}
              code={code2.default}
            >
              <CodeDemo2 />
            </CodeDemo>
            <CodeDemo
              title="垂直的 RadioGroup"
              content={<p>一组垂直展示的 Radio。</p>}
              code={code4.default}
            >
              <CodeDemo4 />
            </CodeDemo>
          </div>
        </div>
      </section>
      <section>
        <h2>API</h2>
        <Api data={[]} />
      </section>
    </div>
  );
};

export default RadioExample;
