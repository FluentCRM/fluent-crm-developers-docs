---
description: "FluentCRM use custom database tables to store all the CRM data. Here are the list of database tables and it's schema to understand overall database design and related data attributes of each model."
---

# FluentCRM Database Schema

<Badge type="tip" vertical="top" text="FluentCRM Core" /> <Badge type="warning" vertical="top" text="Advanced" />

FluentCRM use custom database tables to store all the CRM data. Here are the list of database tables and it's schema to
understand overall database design and related data attributes of each model.
## Schema Design
<img :src="$withBase('/assets/img/schema-design.png')" alt="Schema Design" />

## Database Tables

## _fc_subscribers Table

This table store the basic information of a contact

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>user_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>hash</th><td><span title="utf8mb4_unicode_520_ci">varchar(90)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>contact_owner</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>company_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>prefix</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>first_name</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>last_name</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>email</th><td><span title="utf8mb4_unicode_520_ci">varchar(190)</span></td><td>
</td></tr><tr class="odd"><th>timezone</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>address_line_1</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>address_line_2</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>postal_code</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>city</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>state</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>country</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>ip</th><td><span title="utf8mb4_unicode_520_ci">varchar(20)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>latitude</th><td><span title="">decimal(10,8)</span> <i>NULL</i></td><td>
</td></tr><tr><th>longitude</th><td><span title="">decimal(10,8)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>total_points</th><td><span title="">int unsigned</span> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr><th>life_time_value</th><td><span title="">int unsigned</span> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr class="odd"><th>phone</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <span title="Default value">[<b>subscribed</b>]</span></td><td>
</td></tr><tr class="odd"><th>contact_type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>lead</b>]</span></td><td>
</td></tr><tr><th>source</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>avatar</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>date_of_birth</th><td><span title="">date</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>last_activity</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>


## fc_tags
Storing the tags information

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">int unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>title</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span></td><td>
</td></tr><tr><th>slug</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span></td><td>
</td></tr><tr class="odd"><th>description</th><td><span title="utf8mb4_unicode_520_ci">tinytext</span> <i>NULL</i></td><td>
</td></tr><tr><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## fc_lists
Storing the lists information
<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">int unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>title</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span></td><td>
</td></tr><tr><th>slug</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span></td><td>
</td></tr><tr class="odd"><th>description</th><td><span title="utf8mb4_unicode_520_ci">tinytext</span> <i>NULL</i></td><td>
</td></tr><tr><th>is_public</th><td><span title="">tinyint(1)</span> <i>NULL</i> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## _fc_subscriber_pivot
Pivot Table for subscriber's tag and list relationship
<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>subscriber_id</th><td><span title="">bigint unsigned</span></td><td>
</td></tr><tr><th>object_id</th><td><span title="">bigint unsigned</span></td><td>
</td></tr><tr class="odd"><th>object_type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>is_public</th><td><span title="">tinyint(1)</span> <span title="Default value">[<b>1</b>]</span></td><td>
</td></tr><tr><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## _fc_subscriber_meta
Meta table for subscribers
<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>subscriber_id</th><td><span title="">bigint unsigned</span></td><td>
</td></tr><tr><th>created_by</th><td><span title="">bigint unsigned</span></td><td>
</td></tr><tr class="odd"><th>object_type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>option</b>]</span></td><td>
</td></tr><tr><th>key</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span></td><td>
</td></tr><tr class="odd"><th>value</th><td><span title="utf8mb4_unicode_520_ci">longtext</span> <i>NULL</i></td><td>
</td></tr><tr><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## _fc_subscriber_notes
Subscriber's Note table
<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>subscriber_id</th><td><span title="">bigint unsigned</span></td><td>
</td></tr><tr><th>parent_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_by</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>open</b>]</span></td><td>
</td></tr><tr class="odd"><th>type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>note</b>]</span></td><td>
</td></tr><tr><th>is_private</th><td><span title="">tinyint</span> <i>NULL</i> <span title="Default value">[<b>1</b>]</span></td><td>
</td></tr><tr class="odd"><th>title</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>description</th><td><span title="utf8mb4_unicode_520_ci">longtext</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>


## _fc_subscriber_notes
Subscriber's Note table
<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>subscriber_id</th><td><span title="">bigint unsigned</span></td><td>
</td></tr><tr><th>parent_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_by</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>open</b>]</span></td><td>
</td></tr><tr class="odd"><th>type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>note</b>]</span></td><td>
</td></tr><tr><th>is_private</th><td><span title="">tinyint</span> <i>NULL</i> <span title="Default value">[<b>1</b>]</span></td><td>
</td></tr><tr class="odd"><th>title</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>description</th><td><span title="utf8mb4_unicode_520_ci">longtext</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## _fc_campaigns
Campaigns Table. This table store email campaigns, sequence emails, email action from automation
<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>parent_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <span title="Default value">[<b>campaign</b>]</span></td><td>
</td></tr><tr class="odd"><th>title</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span></td><td>
</td></tr><tr><th>available_urls</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>slug</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span></td><td>
</td></tr><tr class="odd"><th>template_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>email_subject</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>email_pre_header</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>email_body</th><td><span title="utf8mb4_unicode_520_ci">longtext</span></td><td>
</td></tr><tr class="odd"><th>recipients_count</th><td><span title="">int</span> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr><th>delay</th><td><span title="">int</span> <i>NULL</i> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr class="odd"><th>utm_status</th><td><span title="">tinyint(1)</span> <i>NULL</i> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr><th>utm_source</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>utm_medium</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>utm_campaign</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>utm_term</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>utm_content</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>design_template</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>scheduled_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>settings</th><td><span title="utf8mb4_unicode_520_ci">longtext</span> <i>NULL</i></td><td>
</td></tr><tr><th>created_by</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## _fc_campaign_emails
Store individual emails of a campaign

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>campaign_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>email_type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>campaign</b>]</span></td><td>
</td></tr><tr class="odd"><th>subscriber_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>email_subject_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>email_address</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span></td><td>
</td></tr><tr><th>email_subject</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>email_body</th><td><span title="utf8mb4_unicode_520_ci">longtext</span> <i>NULL</i></td><td>
</td></tr><tr><th>email_headers</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>is_open</th><td><span title="">tinyint(1)</span> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr><th>is_parsed</th><td><span title="">tinyint(1)</span> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr class="odd"><th>click_counter</th><td><span title="">int</span> <i>NULL</i></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <span title="Default value">[<b>draft</b>]</span></td><td>
</td></tr><tr class="odd"><th>note</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr><th>scheduled_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>email_hash</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## _fc_campaign_url_metrics
Email Open/Click Tracking Table

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>url_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>campaign_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>subscriber_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>click</b>]</span></td><td>
</td></tr><tr class="odd"><th>ip_address</th><td><span title="utf8mb4_unicode_520_ci">varchar(30)</span> <i>NULL</i></td><td>
</td></tr><tr><th>country</th><td><span title="utf8mb4_unicode_520_ci">varchar(40)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>city</th><td><span title="utf8mb4_unicode_520_ci">varchar(40)</span> <i>NULL</i></td><td>
</td></tr><tr><th>counter</th><td><span title="">int unsigned</span> <span title="Default value">[<b>1</b>]</span></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>


## _fc_sequence_tracker
Tracking Database for Email Sequences

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>campaign_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>last_sequence_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>subscriber_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>next_sequence_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>active</b>]</span></td><td>
</td></tr><tr><th>type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>sequence_tracker</b>]</span></td><td>
</td></tr><tr class="odd"><th>last_executed_time</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>next_execution_time</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>notes</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## _fc_funnels
Automation / Funnel Storage Table

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <span title="Default value">[<b>funnel</b>]</span></td><td>
</td></tr><tr><th>title</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span></td><td>
</td></tr><tr class="odd"><th>trigger_name</th><td><span title="utf8mb4_unicode_520_ci">varchar(150)</span> <i>NULL</i></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>draft</b>]</span></td><td>
</td></tr><tr class="odd"><th>conditions</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr><th>settings</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_by</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>


## _fc_funnel_sequences
Automation / Funnel Sequences Storage Table
<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>funnel_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>parent_id</th><td><span title="">bigint unsigned</span> <i>NULL</i> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr class="odd"><th>action_name</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>condition_type</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>sequence</b>]</span></td><td>
</td></tr><tr><th>title</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>description</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>draft</b>]</span></td><td>
</td></tr><tr class="odd"><th>conditions</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr><th>settings</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>note</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr><th>delay</th><td><span title="">int unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>c_delay</th><td><span title="">int unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>sequence</th><td><span title="">int unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_by</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## _fc_funnel_subscribers
Funnel Sequence - Funnel - Subscriber Relationship DB Table

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>funnel_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>starting_sequence_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>next_sequence</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>subscriber_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>last_sequence_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>next_sequence_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>last_sequence_status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>pending</b>]</span></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>active</b>]</span></td><td>
</td></tr><tr class="odd"><th>type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>funnel</b>]</span></td><td>
</td></tr><tr><th>last_executed_time</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>next_execution_time</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>notes</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>source_trigger_name</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>source_ref_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## _fc_funnel_metrics
Funnel Sequence - Tracking Table for a subscriber

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>funnel_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>sequence_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>subscriber_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>benchmark_value</th><td><span title="">bigint unsigned</span> <i>NULL</i> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr class="odd"><th>benchmark_currency</th><td><span title="utf8mb4_unicode_520_ci">varchar(10)</span> <i>NULL</i> <span title="Default value">[<b>USD</b>]</span></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span> <i>NULL</i> <span title="Default value">[<b>completed</b>]</span></td><td>
</td></tr><tr class="odd"><th>notes</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>


## fc_contact_relations
This table will be available for extended ecommerce module if you sync the data from Ecommerce / LMS

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>subscriber_id</th><td><span title="">bigint unsigned</span></td><td>
</td></tr><tr><th>provider</th><td><span title="utf8mb4_unicode_520_ci">varchar(100)</span></td><td>
</td></tr><tr class="odd"><th>provider_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr><th>first_order_date</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>last_order_date</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>total_order_count</th><td><span title="">int</span> <i>NULL</i> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr class="odd"><th>total_order_value</th><td><span title="">decimal(10,2)</span> <i>NULL</i> <span title="Default value">[<b>0.00</b>]</span></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(100)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>commerce_taxonomies</th><td><span title="utf8mb4_unicode_520_ci">longtext</span> <i>NULL</i></td><td>
</td></tr><tr><th>commerce_coupons</th><td><span title="utf8mb4_unicode_520_ci">longtext</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>meta_col_1</th><td><span title="utf8mb4_unicode_520_ci">mediumtext</span> <i>NULL</i></td><td>
</td></tr><tr><th>meta_col_2</th><td><span title="utf8mb4_unicode_520_ci">mediumtext</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>


## fc_contact_relation_items
This table will be available for extended ecommerce module if you sync the data from Ecommerce / LMS for storing individual record for ecommerce / LMS contacts

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>subscriber_id</th><td><span title="">bigint unsigned</span></td><td>
</td></tr><tr><th>relation_id</th><td><span title="">bigint unsigned</span></td><td>
</td></tr><tr class="odd"><th>provider</th><td><span title="utf8mb4_unicode_520_ci">varchar(100)</span></td><td>
</td></tr><tr><th>origin_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>item_id</th><td><span title="">bigint unsigned</span></td><td>
</td></tr><tr><th>item_sub_id</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>item_value</th><td><span title="">decimal(10,2)</span> <i>NULL</i></td><td>
</td></tr><tr><th>status</th><td><span title="utf8mb4_unicode_520_ci">varchar(100)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>item_type</th><td><span title="utf8mb4_unicode_520_ci">varchar(100)</span> <i>NULL</i></td><td>
</td></tr><tr><th>meta_col</th><td><span title="utf8mb4_unicode_520_ci">mediumtext</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## fc_smart_links
For storing SmartLinks and it's configuration

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>title</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr><th>short</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>target_url</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr><th>actions</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>notes</th><td><span title="utf8mb4_unicode_520_ci">text</span> <i>NULL</i></td><td>
</td></tr><tr><th>contact_clicks</th><td><span title="">int</span> <i>NULL</i> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr class="odd"><th>all_clicks</th><td><span title="">int</span> <i>NULL</i> <span title="Default value">[<b>0</b>]</span></td><td>
</td></tr><tr><th>created_by</th><td><span title="">bigint unsigned</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>


## fc_url_stores
For storing Email Long Links and short links for tracking

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>url</th><td><span title="utf8mb4_unicode_520_ci">tinytext</span></td><td>
</td></tr><tr><th>short</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>

## fc_meta
For storing CRM settings

<table cellspacing="0" class="nowrap">
<thead><tr><th>Column</th><td>Type</td><td>Comment</td></tr></thead>
<tbody><tr><th>id</th><td><span title="">bigint unsigned</span> <i>Auto Increment</i></td><td>
</td></tr><tr class="odd"><th>object_type</th><td><span title="utf8mb4_unicode_520_ci">varchar(50)</span></td><td>
</td></tr><tr><th>object_id</th><td><span title="">bigint</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>key</th><td><span title="utf8mb4_unicode_520_ci">varchar(192)</span></td><td>
</td></tr><tr><th>value</th><td><span title="utf8mb4_unicode_520_ci">longtext</span> <i>NULL</i></td><td>
</td></tr><tr class="odd"><th>created_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr><tr><th>updated_at</th><td><span title="">timestamp</span> <i>NULL</i></td><td>
</td></tr></tbody></table>
