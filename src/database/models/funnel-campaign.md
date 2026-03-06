---
description: "FunnelCampaign Model manages email campaigns used within automation funnels."
---

# Funnel Campaign Model

| DB Table Name | {wp_db_prefix}_fc_campaigns                                            |
|---------------|------------------------------------------------------------------------|
| Schema        | <a href="/database/#fc-campaigns-table">Check Schema</a> |
| Source File   | fluent-crm/app/Models/FunnelCampaign.php                               |
| Name Space    | FluentCrm\App\Models                                                   |
| Class         | FluentCrm\App\Models\FunnelCampaign                                    |

## Global Scope

Extends `Campaign` with `type = 'funnel_email_campaign'`. Shares the `fc_campaigns` table but is automatically scoped to funnel emails only.

## Usage

FunnelCampaign inherits all attributes, relationships, and methods from the <a href="/database/models/campaign">Campaign Model</a>.

### Additional Methods

#### getMock() <Badge type="tip" text="static" />
Returns a default blank campaign structure for the funnel email UI

- Returns `array`

```php
$mock = FluentCrm\App\Models\FunnelCampaign::getMock();
```

#### sendToCustomAddresses($addresses, $args, $refSubscriber)
Send funnel emails to arbitrary email addresses

- Parameters
  - $addresses `array` — email addresses
  - $args `array` — additional campaign email arguments
  - $refSubscriber `Subscriber` — reference subscriber for parsing
- Returns `void`

```php
$funnelCampaign->sendToCustomAddresses(
    ['custom@example.com'],
    ['scheduled_at' => current_time('mysql')],
    $subscriber
);
```

#### subscribe($subscriberIds, $emailArgs, $isModel)
Enqueue funnel emails for subscribers (overrides Campaign's method with funnel-specific body parsing and tracking)

- Parameters
  - $subscriberIds `array`
  - $emailArgs `array`
  - $isModel `boolean`
- Returns `array` — inserted CampaignEmail IDs

```php
$emailIds = $funnelCampaign->subscribe([1, 2, 3]);
```
