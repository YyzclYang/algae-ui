import React from 'react';
import PropTypes from 'prop-types';
import { classNames, scopedClassMaker, useControlState } from '../utils';
import TreeItem, { TreeItemSourceData } from './treeItem';
import './style/tree.scss';

const sc = scopedClassMaker('algae-ui-tree');

interface TreeProps {
  className?: string;
  autoCheck?: boolean;
  checkable?: boolean;
  switcherIcons?: [string | React.ReactElement, string | React.ReactElement];
  defaultValues?: string[];
  selectedValues?: string[];
  onSelect?: (selectedValues: string[]) => void;
  sourceData: TreeItemSourceData[];
}

const Tree: React.FC<TreeProps> = (props: TreeProps) => {
  const {
    className,
    autoCheck,
    checkable,
    switcherIcons,
    defaultValues,
    selectedValues: initialSelectedValues,
    onSelect,
    sourceData
  } = props;

  const [selectedValues, setSelectedValues] = useControlState(
    defaultValues,
    initialSelectedValues
  );
  const onTreeSelect = (selectedValues: string[]) => {
    setSelectedValues(selectedValues);
  };
  const onTreeItemSelect = (selectedValues: string[]) => {
    onSelect && onSelect(selectedValues);
    onTreeSelect(selectedValues);
  };

  return (
    <div className={classNames(sc(), className)}>
      <div className={sc('list')}>
        {sourceData.map((treeData) => (
          <TreeItem
            key={treeData.value}
            sourceData={treeData}
            level={0}
            autoCheck={autoCheck}
            switcherIcons={switcherIcons ?? ['triangle-down', 'triangle-right']}
            checkable={checkable!}
            checked={selectedValues!.includes(treeData.value)}
            selectedValues={selectedValues!}
            onTreeItemSelect={onTreeItemSelect}
          />
        ))}
      </div>
    </div>
  );
};

Tree.displayName = 'Tree';

Tree.propTypes = {
  sourceData: PropTypes.array.isRequired
};

Tree.defaultProps = {
  autoCheck: false,
  checkable: false,
  defaultValues: [],
  sourceData: []
};

export default Tree;
