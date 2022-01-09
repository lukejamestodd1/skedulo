import React from "react"
import { IAppTabContainer } from "../common/types"

import { SectionGroup } from "../components/section/SectionGroup"
import { SectionPanel } from "../components/section/SectionPanel"

import * as data from '../server/db.json'

const jobs = data.jobs;
const jobAllocations = data.jobAllocations;
const activites = data.activities;
const activityAllocations = data.activityAllocations;
const resources = data.resources;

console.log(jobs);
console.log(jobAllocations);
console.log(activites);
console.log(activityAllocations);
console.log(resources);

interface ResourceSchedule {
  resourceName: string
  resourceId: number
  allocations: {
    allocType: 'job' | 'activity',
    name: string,
    start: string,
    end: string
  }[]
}

let resourceSchedules : ResourceSchedule[] = [];

resources.forEach((resource) => { 
  
  let allocations1: ResourceSchedule["allocations"]= [];

  //iterate through joballocations
  var jobAllocations1 = jobAllocations.filter(joballocation => joballocation.resourceId = resource.id);
  console.log(jobAllocations1);

   //if resource id matches
  if (jobAllocations1 !== undefined){
    //get jobnumbers
    jobAllocations1.forEach(joballocation => {
      //look through jobs for job number and find job details
      var jobs1 = jobs.filter(id => joballocation.jobId);
      if(jobs1 !== undefined){
        jobs1.forEach(job => {
          //push to allocations array
          allocations1.push(
            {
              allocType: 'job',
              name: job.name,
              start: job.start,
              end: job.end,
            }
          );
        });
      }
      
    });  
  }
  
  

  //iterate through activityallocations
  //if resource id match
  //get activitynumber
  //look through activities and get 

  let newResourceSchedule : ResourceSchedule = {
    resourceName: resource.name,
    resourceId: resource.id,
    allocations: allocations1
  };

  resourceSchedules.push(newResourceSchedule);
});


export const QuestionTwo: React.FC<IAppTabContainer> = (props) => {
  return (
    <SectionGroup>
      <SectionPanel>{JSON.stringify(resourceSchedules)}</SectionPanel>
    </SectionGroup>
  )
}
