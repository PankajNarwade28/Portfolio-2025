import React from 'react';
import { useState, useEffect } from 'react';
import { username, githubUsername } from "../../../util/links"; 

export const ContactInfoCard = ({ iconUrl, text, link, platform, isActive }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [solvedCount, setSolvedCount] = useState(null);
     const [repoCount, setRepoCount] = useState(null);
    const [loading, setLoading] = useState(false);

    // Replace with your desired LeetCode username
    // const username = 'Pankaj_Narwade_28'; 
    // const githubUsername = 'PankajNarwade28';
    // For leetcode, fetch the number of solved problems
    useEffect(() => {
        // Only fetch LeetCode stats if the card's platform is 'leetcode'
        if (platform === 'leetcode') {
            setLoading(true);
            const fetchLeetCodeStats = async () => {
                try {
                    const response = await fetch('/graphql', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            query: `
                                query userSolutionStats($username: String!) {
                                    matchedUser(username: $username) {
                                        submitStats: submitStatsGlobal {
                                            acSubmissionNum {
                                                difficulty
                                                count
                                            }
                                        }
                                    }
                                }
                            `,
                            variables: { username },
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    if (data.data && data.data.matchedUser && data.data.matchedUser.submitStats) {
                         const allStats = data.data.matchedUser.submitStats.acSubmissionNum;
                         const totalSolved = allStats.find(stat => stat.difficulty === 'All');
                         
                         if (totalSolved) {
                             setSolvedCount(totalSolved.count);
                         } else {
                             setSolvedCount(0);
                         }
                    } else {
                         setSolvedCount('N/A');
                    }
                } catch (err) {
                    console.error('Error fetching LeetCode stats:', err);
                    setSolvedCount('N/A');
                } finally {
                    setLoading(false);
                }
            };
            fetchLeetCodeStats();
        }
    }, [platform, username]);
    // For GitHub, fetch the number of public repositories
    useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
          throw new Error(`GitHub user "${username}" not found.`);
        }

        const data = await response.json();
        
        // The total public repositories count is in the 'public_repos' field
        setRepoCount(data.public_repos);

      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setRepoCount('N/A');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
        fetchGithubStats();
    }
  }, [username]);

    const handleClick = () => {
        if (platform === 'email') {
            window.location.href = link;
        } else {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    const getPlatformColor = (platform) => {
        switch (platform) {
            case 'email': return '#b8627bff';
            case 'github': return '#d8d5d5ff';
            case 'linkedin': return '#0077B5';
            case 'leetcode': return '#FFA116';
            default: return '#4ECDC4';
        }
    };

    return (
        <div
            className={`contact-info-card ${isActive ? 'active' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            style={{ '--platform-color': getPlatformColor(platform) }}
        >
            <div className="card-icon">
                <img src={iconUrl} alt={platform} />
                <div className="icon-glow"></div>
            </div>
            <div className="card-content">
                <h4 className="platform-name">{platform.charAt(0).toUpperCase() + platform.slice(1)}</h4>
                <p className="contact-text">
                    {platform === 'leetcode' 
                        ?  (loading ? 'Loading...' : (solvedCount !== null ?  `${solvedCount} problems solved` : 'N/A'))
                        : text}
                </p>
                <div className="hover-indicator">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
};