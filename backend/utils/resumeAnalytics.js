export const missingSkills = (jobSkill = [], resumeSkill = []) => {
  const resumeSet = new Set(resumeSkill);
  const missingSkill = jobSkill.filter((skill) => !resumeSet.has(skill));
  return missingSkill;
};
export const commonSkills = (jobSkill = [], resumeSkill = []) => {
  const resumeSet = new Set(resumeSkill);
  const commonSkill = jobSkill.filter((skill) => resumeSet.has(skill));

  return commonSkill;
};
export const matchScore = (jobSkill = [], resumeSkill = []) => {
  const resumeSet = new Set(resumeSkill);
  let commonCount = 0;
  for (let skill of jobSkill) {
    if (resumeSet.has(skill)) commonCount++;
  }
  const score = (commonCount / jobSkill.length) * 100;
  return score;
};
