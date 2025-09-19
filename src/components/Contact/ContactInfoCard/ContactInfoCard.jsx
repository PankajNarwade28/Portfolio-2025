import React from 'react';
import { useState, useEffect } from 'react';

export const ContactInfoCard = ({ iconUrl, text, link, platform, isActive }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    // Replace with your desired LeetCode and GitHub usernames
    const leetcodeUsername = 'Pankaj_Narwade_28';
    const githubUsername = 'Pankaj_Narwade_28';

    useEffect(() => {
        setLoading(true);
        if (platform === 'leetcode') {
            const fetchLeetCodeStats = async () => {
                try {
                    const response = await fetch('/graphql', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
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
                            variables: { username: leetcodeUsername },
                        }),
                    });
                    const data = await response.json();
                    const allStats = data.data?.matchedUser?.submitStats?.acSubmissionNum;
                    const totalSolved = allStats?.find(stat => stat.difficulty === 'All');
                    setStats(totalSolved?.count || 0);
                } catch (err) {
                    console.error('Error fetching LeetCode stats:', err);
                    setStats('N/A');
                } finally {
                    setLoading(false);
                }
            };
            fetchLeetCodeStats();
        } else if (platform === 'github') {
            const fetchGithubStats = async () => {
                try {
                    const response = await fetch(`https://api.github.com/users/${githubUsername}`);
                    const data = await response.json();
                    setStats(data.public_repos);
                } catch (err) {
                    console.error('Error fetching GitHub stats:', err);
                    setStats('N/A');
                } finally {
                    setLoading(false);
                }
            };
            fetchGithubStats();
        } else {
            setLoading(false); // No fetching for other platforms
            setStats(null);
        }
    }, [platform, leetcodeUsername, githubUsername]);

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
                    {loading
                        ? 'Loading...'
                        : platform === 'leetcode'
                            ? (stats !== null ? `${stats} problems solved` : 'N/A')
                            : platform === 'github'
                                ? (stats !== null ? `${stats} public repos` : 'N/A')
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