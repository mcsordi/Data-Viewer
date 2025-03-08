import React from 'react';
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';
import { IconsEditPage } from '../../../shared/types/IconsEditPage';

export const PeoplePage: React.FC<IconsEditPage> = ({ editIcons }) => {
  return (
    <div className={`dark:text-white flex w-full`}>
      <ContainerGeneric>
        {editIcons.map((icon, index) => (
          <EditComponent
            key={index}
            icon={icon.icon}
            textClass={icon.textClass}
            theresClass={icon.theresClass}
            itsButton={icon.itsButton}
            textIcon={icon.textIcon}
          />
        ))}
      </ContainerGeneric>
    </div>
  );
};
