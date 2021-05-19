import React, { useEffect } from 'react';

// Hooks & actions
import { connect } from 'react-redux'
import { fetchProjects } from '../store/actions/projects'

// Components
import Main from '../components/main/Main';
import Side from '../components/main/Side';
import ProjectItem from '../components/ui/ProjectItem';
import ProjectsContainer from '../components/ui/ProjectsContainer';

const Offers = ({
  projects,
  fetchProjects
}) => {

  useEffect(() => fetchProjects(), [fetchProjects])
  
  return (
    <>
      <Main>
        <ProjectsContainer>
          {projects.map(project => (
            <ProjectItem
                key={project.id}
                projectData={project.projectData}
                projectOffers={project.projectOffers}
              />
          ))}
        </ProjectsContainer>
      </Main>
      <Side>
        
      </Side>
    </>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.projects.allProjects
  }
}

const mapDispatchToProps = {
  fetchProjects
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
