'use client'

import { Suspense, use } from 'react'
import { fetchFeature, type Status } from './data'
import {
  icons,
  ChromeIcon,
  EdgeIcon,
  FirefoxIcon,
  SafariIcon,
} from './Icons'
import './BaselineStatus.css'
import type { FeatureId } from './feature-ids'

interface BaselineStatusProps {
  featureId: FeatureId
}

export function BaselineStatus({ featureId }: BaselineStatusProps) {
  return (
    <Suspense fallback={<div className="baseline-status baseline-skeleton" />}>
      <FeatureDetails featureId={featureId} />
    </Suspense>
  )
}

function FeatureDetails({ featureId }: { featureId: FeatureId }) {
  const data = use(fetchFeature(featureId))

  const { status, name, description, browsers, lowDate } = data

  const Icon = icons[status]

  return (
    <details className="baseline-status" data-status={status}>
      <summary className="baseline-summary">
        <div className="baseline-header">
          <span className="baseline-logo" >
            <strong>{name}</strong>
          </span>
          <span className="baseline-title">
            <Icon />
            {getStatusLabel(status, lowDate)}
          </span>
        </div>
        <div className="baseline-browsers">
          <ChromeIcon active={browsers.chrome} />
          <EdgeIcon active={browsers.edge} />
          <FirefoxIcon active={browsers.firefox} />
          <SafariIcon active={browsers.safari} />
        </div>
      </summary>

      <div className="baseline-content">
        <h3>{name}</h3>
        {description ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p>{getDefaultDescription(status, lowDate)}</p>
        )}
        <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
          <a
            href={`https://webstatus.dev/features/${featureId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on WebStatus.dev
          </a>
        </div>
      </div>
    </details>
  )
}



function getStatusLabel(status: Status, lowDate?: string) {
  const labels = {
    widely: 'Widely available',
    newly: 'Newly available',
    limited: 'Limited availability',
    unavailable: 'Unavailable',
    unknown: 'Unknown'
  } as const satisfies Record<Status, string>
  return (
    <>
      {labels[status]}
      {status === 'newly' && lowDate && (
        <span className="baseline-badge">
          {new Date(lowDate).getFullYear()}
        </span>
      )}
    </>
  )
}

function getDefaultDescription(status: Status, date?: string) {
  if (status === 'widely') {
    return `This feature is well established and works across many devices and browser versions.${
      date
        ? ` It’s been available across browsers since ${new Date(
            date,
          ).getFullYear()}.`
        : ''
    }`
  }
  if (status === 'newly') {
    return `Since ${
      date ? new Date(date).getFullYear() : 'recently'
    }, this feature works across the latest devices and browser versions. Support may be missing from older versions.`
  }
  return 'We currently don’t have detailed description for this feature.'
}
