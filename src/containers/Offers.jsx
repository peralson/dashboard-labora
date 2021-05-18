import React from 'react';

// Hooks
import useProjects from '../hooks/useProjects'

// Components
import PageGrid from '../components/main/PageGrid';
import Menu from '../components/main/Menu';
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import MultiOfferProject from '../components/ui/MultiOfferProject';
import ProjectsContainer from '../components/ui/ProjectsContainer';

const Offers = () => {
  const projects = useProjects();
  
  return (
    <PageGrid>
      <Menu />
      <Main>
        <ProjectsContainer>
          {projects.map(project => (
            !project.projectData.name
              ? <MultiOfferProject
                  key={project.id}
                  projectData={project.projectData}
                  projectOffers={project.projectOffers}
                />
              : <MultiOfferProject
                  key={project.id}
                  projectData={project.projectData}
                  projectOffers={project.projectOffers}
                />
          ))}
        </ProjectsContainer>
      </Main>
      <Side>
        
      </Side>
    </PageGrid>
  );
};

export default Offers;
