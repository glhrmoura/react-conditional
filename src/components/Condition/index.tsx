import React from 'react';

export interface ConditionProps {
  children?: React.ReactNode;
}

export enum ConditionChild {
  If = 'If',
  ElseIf = 'ElseIf',
  Else = 'Else',
}

const Condition: React.FC<ConditionProps> = ({ children }) => {
  const groups = React.Children.toArray(children).reduce((groups: any, childItem: any) => {
    if (childItem?.type?.displayName in groups) groups[childItem?.type?.displayName].push(childItem);
    else groups.Else.push(childItem);

    return groups;
  }, { If: [], ElseIf: [], Else: [] });

  return [...groups.If, ...groups.ElseIf, ...groups.Else].find((childItem: any) => {
    return childItem.props.condition || childItem.type.displayName === ConditionChild.Else;
  }) || null;
};

export default Condition;
