export const loadUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

export const loadJobs = () => {
  try {
    const jobs = localStorage.getItem("jobs");
    return jobs ? JSON.parse(jobs) : [];
  } catch {
    return [];
  }
};

export const saveJobs = (jobs) => {
  localStorage.setItem("jobs", JSON.stringify(jobs));
};
