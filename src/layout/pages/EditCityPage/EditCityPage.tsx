/* eslint-disable react/prop-types */
import { ContainerGeneric } from '../../../shared/components/ContainerEditors/ContainerEditors';
import { EditComponent } from '../../../shared/components/EditComponent/EditComponent';
import { HeaderPage } from '../../../shared/components/HeaderPage/HeaderPage';
import { IconsEditPage } from '../../../shared/types/IconsEditPage';

export const EditCityPage: React.FC<IconsEditPage> = ({ editIcons }) => {
  return (
    <div className="w-full h-screen">
      <HeaderPage text="Editar Cidade" />
      <ContainerGeneric>
        {editIcons.map((icon, index) => {
          return (
            <EditComponent
              key={index}
              icon={icon.icon}
              itsButton={icon.itsButton}
              textIcon={icon.textIcon}
              textClass={icon.textClass}
              theresClass={icon.theresClass}
              whereToNav={
                icon.textIcon == 'Pesquisar' || icon.textIcon == 'Voltar'
                  ? '/cidades'
                  : ''
              }
            />
          );
        })}
      </ContainerGeneric>
    </div>
  );
};
