import { Role, ActorProfile } from './types';

export function scoreRoleMatch(role: Role, profile: ActorProfile) {
  const roleTags = new Set(role.tags.map((tag) => tag.toLowerCase()));
  const skills = profile.skills.map((skill) => skill.toLowerCase());
  const matchCount = skills.filter((skill) => roleTags.has(skill)).length;
  const ageFit = profile.age >= role.ageMin && profile.age <= role.ageMax ? 2 : 0;
  return matchCount * 2 + ageFit;
}

export function getRecommendedRoles(roles: Role[], profile: ActorProfile) {
  return [...roles]
    .map((role) => ({ role, score: scoreRoleMatch(role, profile) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.role);
}
