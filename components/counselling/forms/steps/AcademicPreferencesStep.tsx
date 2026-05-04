"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { MultiSearchableSelect } from '../../fields/MultiSearchableSelect';
import { MultiSelectChips } from '../../fields/MultiSelectChips';
import { ENGINEERING_BRANCHES, MEDICAL_COURSES, AGRICULTURE_PROGRAMS, NURSING_PROGRAMS, MAHARASHTRA_DISTRICTS } from '@/lib/fieldMaps';
import { StepProgress } from '../../StepProgress';
import { StepFooter } from '../../StepFooter';

export const AcademicPreferencesStep = () => {
  const { formData, updateField, nextStep, counsellingType } = useApplicationStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const getPreferenceConfig = () => {
    const hasNEET = formData.hasNEETScore === 'Yes';
    
    // Default/Engineering Config
    let programs = ENGINEERING_BRANCHES;
    let recommendations = [
      "Computer Science and Engineering (CSE)",
      "CSE – Artificial Intelligence (AI)",
      "Information Technology (IT)",
      "Electronics and Communication Engineering (ECE)"
    ];
    let courseTypes = ['B.Tech', 'B.E.', 'B.Tech + M.Tech (Dual)', 'B.S.', 'Others*'];
    let instituteTypes = ['IIT', 'NIT', 'IIIT', 'GFTI', 'Others*'];
    let locations = MAHARASHTRA_DISTRICTS;

    if (counsellingType?.includes('Medical')) {
      programs = MEDICAL_COURSES;
      recommendations = ["MBBS (Bachelor of Medicine & Bachelor of Surgery)", "BDS (Bachelor of Dental Surgery)"];
      courseTypes = ['Degree (UG)', 'Diploma', 'Others*'];
      instituteTypes = ['Government Medical College (GMC)', 'Private Medical College', 'Deemed University', 'Others*'];

      // If no NEET, remove NEET-mandatory courses
      if (!hasNEET) {
        const neetMandatory = ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BUMS', 'BVSc'];
        programs = MEDICAL_COURSES.filter(p => !neetMandatory.some(m => p.includes(m)));
        recommendations = recommendations.filter(p => !neetMandatory.some(m => p.includes(m)));
      }
    } else if (counsellingType?.includes('Nursing')) {
      programs = NURSING_PROGRAMS;
      recommendations = ["Basic B.Sc. Nursing", "GNM (General Nursing and Midwifery)"];
      courseTypes = ['B.Sc. Nursing', 'Others*'];
      instituteTypes = ['Government Nursing College', 'Private/Aided Nursing Institute', 'Others*'];
      
    } else if (counsellingType?.includes('Agriculture')) {
      programs = AGRICULTURE_PROGRAMS;
      recommendations = ["B.Sc. (Hons.) Agriculture", "B.Tech. (Food Technology)"];
      courseTypes = ['B.Sc. (Hons.)', 'B.Tech.', 'Others*'];
      instituteTypes = ['Government', 'Private', 'Unaided', 'Others*'];
    } else if (counsellingType === 'MHT_CET_Engineering') {
      programs = ENGINEERING_BRANCHES;
      recommendations = ["Computer Science and Engineering (CSE)", "Information Technology (IT)", "Electronics and Telecommunication (E&TC)"];
      courseTypes = ['B.E. / B.Tech', 'Others*'];
      instituteTypes = ['Government Autonomous', 'Government Aided', 'University Department', 'Private', 'Others*'];
    }

    return { programs, recommendations, courseTypes, instituteTypes, locations };
  };

  const config = getPreferenceConfig();

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.preferredBranches || formData.preferredBranches.length === 0) {
      newErrors.preferredBranches = "Please select at least one program of interest";
    }
    if (!formData.courseType || formData.courseType.length === 0) {
      newErrors.courseType = "Please select at least one desired course type";
    }
    if (!formData.instituteTypes || formData.instituteTypes.length === 0) {
      newErrors.instituteTypes = "Please select at least one preferred institute type";
    }
    if (!formData.preferredLocations || formData.preferredLocations.length === 0) {
      newErrors.preferredLocations = "Please select at least one preferred location (Priority-wise)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Academic Preferences" />
      
      <div className="space-y-8">
        <MultiSearchableSelect
          label="Preferred Academic Programs"
          sublabel="Search and select all programs you're interested in"
          options={config.programs}
          recommendations={config.recommendations}
          value={formData.preferredBranches || []}
          error={errors.preferredBranches}
          onChange={(v: string[]) => {
            updateField('preferredBranches', v);
            if (errors.preferredBranches) setErrors(prev => ({ ...prev, preferredBranches: '' }));
          }}
          required
        />

        <MultiSelectChips
          label="Course Type"
          required
          options={config.courseTypes}
          value={formData.courseType || []}
          error={errors.courseType}
          onChange={(v: string[]) => {
            updateField('courseType', v);
            if (errors.courseType) setErrors(prev => ({ ...prev, courseType: '' }));
          }}
        />

        <MultiSearchableSelect
          label="Preferred Locations (Maharashtra Districts)"
          sublabel="Search and select districts in order of your preference (Priority-wise)"
          placeholder="Search and add districts..."
          options={config.locations}
          value={formData.preferredLocations || []}
          error={errors.preferredLocations}
          onChange={(v: string[]) => {
            updateField('preferredLocations', v);
            if (errors.preferredLocations) setErrors(prev => ({ ...prev, preferredLocations: '' }));
          }}
          required
        />

        <MultiSelectChips
          label="Preferred Institute Types"
          options={config.instituteTypes}
          value={formData.instituteTypes || []}
          error={errors.instituteTypes}
          onChange={(v: string[]) => {
            updateField('instituteTypes', v);
            if (errors.instituteTypes) setErrors(prev => ({ ...prev, instituteTypes: '' }));
          }}
          required
        />
      </div>

      <div className="mt-12">
        <StepFooter onNext={handleNext} />
      </div>
    </div>
  );
};
