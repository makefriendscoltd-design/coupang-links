'use client';

import { useState } from 'react';
import type { LinkEntry } from '@/lib/links';
import './links.css';

interface Props {
  brandSlug: string;
  links: LinkEntry[];
}

export function LinksPage({ brandSlug, links }: Props) {
  const [query, setQuery] = useState('');

  const filtered = query
    ? links.filter(
        (l) =>
          l.title.toLowerCase().includes(query.toLowerCase()) ||
          l.copy.toLowerCase().includes(query.toLowerCase()),
      )
    : links;

  return (
    <div className="links-container">
      {/* 프로필 */}
      <div className="profile">
        <div className="profile-name">@{brandSlug}</div>
        <div className="profile-bio">추천 제품 모아보기</div>
      </div>

      {/* 검색 (2개 이상일 때만) */}
      {links.length > 1 && (
        <div className="search-wrap">
          <span className="search-icon">&#128269;</span>
          <input
            type="text"
            className="search-input"
            placeholder="제품 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <div className="search-count">
            {query ? `${filtered.length}개 결과` : `${links.length}개 제품`}
          </div>
        </div>
      )}

      {/* 카드 리스트 */}
      <div className="cards">
        {filtered.length > 0 ? (
          filtered.map((link) => (
            <a
              key={link.id}
              href={link.coupang_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
            >
              <div className="card-img">
                {link.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={link.image_url} alt={link.title} loading="lazy" />
                ) : (
                  <div className="card-img-placeholder">
                    {(link.title || '?').charAt(0)}
                  </div>
                )}
              </div>
              <div className="card-body">
                <div className="card-name">{link.title}</div>
                <div className="card-headline">{link.copy}</div>
                <div className="card-btn">최저가 확인하기</div>
              </div>
            </a>
          ))
        ) : (
          <div className="empty">
            {query ? '검색 결과가 없습니다.' : '아직 등록된 제품이 없습니다.'}
          </div>
        )}
      </div>

      {/* 쿠팡 고지문 */}
      <div className="footer">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로,
        <br />
        이에 따른 일정액의 수수료를 제공받습니다.
      </div>
    </div>
  );
}
