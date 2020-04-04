import React from 'react';
import { CodeDemo, Api } from '../CommonDispalyComponents';
import IconDisplay, { IconData } from './iconDisplay';
import './icon.example.scss';

import CodeDemo1 from './icon.codeDemo1';
const code1 = require('!!raw-loader!./icon.codeDemo1.tsx');
import CodeDemo2 from './icon.codeDemo2';
const code2 = require('!!raw-loader!./icon.codeDemo2.tsx');
import CodeDemo3 from './icon.codeDemo3';
const code3 = require('!!raw-loader!./icon.codeDemo3.tsx');

const IconExample: React.FunctionComponent = () => {
  const iconDisplayData: IconData[] = [
    {
      title: '方向性图标',
      data: [
        'top',
        'down',
        'left',
        'right',
        'arrow-top',
        'arrow-down',
        'arrow-left',
        'arrow-right'
      ]
    },
    {
      title: '提示建议性图标',
      data: [
        'question',
        'question-circle',
        'info',
        'info-circle',
        'close',
        'close-circle',
        'check',
        'check-circle',
        'warning',
        'warning-circle'
      ]
    },
    {
      title: '编辑类图标',
      data: ['edit', 'form', 'copy', 'delete']
    },
    {
      title: '品牌和标识',
      data: [
        'android',
        'apple',
        'windows',
        'facebook',
        'github',
        'gitlab',
        'google',
        'qq',
        'alipay',
        'wechat'
      ]
    },
    {
      title: '网站通用图标',
      data: [
        'alert',
        'api',
        'bell',
        'calendar',
        'camera',
        'cloud',
        'terminal',
        'code-show',
        'code-hidden',
        'gift',
        'like',
        'lock',
        'setting',
        'tag'
      ]
    }
  ];
  return (
    <div className="icon-example-page">
      <section>
        <h1>Icon 图标</h1>
        <p>语义化的矢量图形。</p>
      </section>
      <section>
        <h2>图标列表</h2>
        <div>
          <IconDisplay iconDisplayData={iconDisplayData} />
        </div>
      </section>
      <section>
        <h2>代码演示</h2>
        <div className="code-demonstration">
          <div className="code-demo-column">
            <CodeDemo
              title="基本用法"
              content={
                <p>
                  使用
                  <code>{`<Icon />`}</code>标签声明组件，指定图标对应的
                  <code>type</code>属性。可以通过<code>rotate</code>
                  属性来设置图标的旋转角度，也可以传入<code>style</code>
                  来控制图标的样式。
                </p>
              }
              code={code1.default}
            >
              <CodeDemo1 />
            </CodeDemo>
            <CodeDemo
              title="使用 iconfont.cn"
              content={
                <p>
                  对于使用
                  <a
                    href="https://www.iconfont.cn/"
                    target="_Blank"
                    rel="noopener noreferrer"
                  >
                    iconfont.cn
                  </a>
                  的用户，通过设置<code>createFromIconfontCN</code>
                  方法参数对象中的<code>scriptUrl </code>字段，
                  即可轻松地使用已有项目中的图标。
                </p>
              }
              code={code3.default}
            >
              <CodeDemo3 />
            </CodeDemo>
          </div>
          <div className="code-demo-column">
            <CodeDemo
              title="自定义图标"
              content={
                <p>
                  使用<code>component</code>
                  属性可以传入一个自定义的组件进行渲染，满足个性化的需求。
                </p>
              }
              code={code2.default}
            >
              <CodeDemo2 />
            </CodeDemo>
          </div>
        </div>
      </section>
      <section>
        <h2>API</h2>
        <Api
          data={[
            ['type', '图标类型。', 'string', '-'],
            [
              'style',
              <>
                设置图标的样式，例如<code>fill</code>和<code>color</code>。
              </>,
              'CSSProperties',
              '-'
            ],
            ['rotate', '图标旋转角度。', 'number', '-']
          ]}
        />
        <p>
          支持原生<code>svg</code>的其他所有属性。
        </p>
      </section>
    </div>
  );
};

export default IconExample;
