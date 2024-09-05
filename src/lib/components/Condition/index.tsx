import React, { ReactElement, ReactNode } from 'react';

export interface ConditionProps {
  children: ReactNode;
}

const Condition: React.FC<ConditionProps> = ({ children }) => {
  let elementToRender: ReactElement | null = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const {
        'rc-if': rcIf,
        'rc-else': rcElse,
        'rc-else-if': rcElseIf,
      } = child.props;

      const override = {
        'rc-if': null,
        'rc-else': null,
        'rc-else-if': null,
      };

      const props = {
        ...child.props,
        ...override,
      };

      if (rcIf) {
        elementToRender = React.cloneElement(child, props);
      } else if (rcElseIf && !elementToRender) {
        elementToRender = React.cloneElement(child, props);
      } else if (rcElse && !elementToRender) {
        elementToRender = React.cloneElement(child, props);
      }
    }
  });

  return elementToRender;
};

export { Condition };