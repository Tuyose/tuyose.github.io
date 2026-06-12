const GITHUB_USERNAME = "Tuyose";
const GITHUB_API = "https://api.github.com";

export interface GitHubUser {
  name: string | null;
  login: string;
  bio: string | null;
  avatar_url: string;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=stars&direction=desc&per_page=30`,
      {
        headers: {
          Accept: "application/vnd.github+json, application/vnd.github.mercy-preview+json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch repos");
    const repos = await response.json();
    return repos.filter((repo: GitHubRepo) => !repo.private);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];

  for (const [secondsInInterval, intervalName] of intervals) {
    const interval = Math.floor(seconds / secondsInInterval);
    if (interval >= 1) {
      return `${interval} ${intervalName}${interval !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
