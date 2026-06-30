import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_referral_settings_tasks_verification_type" AS ENUM('click', 'input');
  CREATE TABLE "pages_blocks_waitlist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Join the Waitlist',
  	"description" varchar DEFAULT 'Sign up to get early access and rewards.',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_waitlist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Join the Waitlist',
  	"description" varchar DEFAULT 'Sign up to get early access and rewards.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "waitlist_completed_tasks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"task_slug" varchar NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "waitlist_read_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" varchar NOT NULL,
  	"read_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "waitlist_liked_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" varchar NOT NULL,
  	"liked_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "waitlist_shared_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post_id" varchar NOT NULL,
  	"shared_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "waitlist" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"name" varchar,
  	"phone" varchar NOT NULL,
  	"college" varchar,
  	"referral_code" varchar,
  	"referred_by_id" integer,
  	"referral_count" numeric DEFAULT 0,
  	"tokens" numeric DEFAULT 0,
  	"status" varchar,
  	"invite_token" varchar,
  	"invite_sent_at" timestamp(3) with time zone,
  	"registered_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "colleges" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "comments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"post_id" integer NOT NULL,
  	"author" varchar NOT NULL,
  	"author_email" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"approved" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "referral_settings_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tokens_required" numeric NOT NULL,
  	"reward" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "referral_settings_tasks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link" varchar,
  	"reward_tokens" numeric DEFAULT 50 NOT NULL,
  	"verification_type" "enum_referral_settings_tasks_verification_type" DEFAULT 'click'
  );
  
  CREATE TABLE "referral_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"token_value_per_referral" numeric DEFAULT 10 NOT NULL,
  	"referral_bonus_percentage" numeric DEFAULT 10 NOT NULL,
  	"activity_rewards_read_blog_post" numeric DEFAULT 5,
  	"activity_rewards_like_blog_post" numeric DEFAULT 2,
  	"activity_rewards_share_blog_post" numeric DEFAULT 10,
  	"activity_rewards_comment_on_post" numeric DEFAULT 15,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users" ADD COLUMN "enable_a_p_i_key" boolean;
  ALTER TABLE "users" ADD COLUMN "api_key" varchar;
  ALTER TABLE "users" ADD COLUMN "api_key_index" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "waitlist_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "colleges_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "comments_id" integer;
  ALTER TABLE "pages_blocks_waitlist" ADD CONSTRAINT "pages_blocks_waitlist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_waitlist" ADD CONSTRAINT "_pages_v_blocks_waitlist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "waitlist_completed_tasks" ADD CONSTRAINT "waitlist_completed_tasks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."waitlist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "waitlist_read_posts" ADD CONSTRAINT "waitlist_read_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."waitlist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "waitlist_liked_posts" ADD CONSTRAINT "waitlist_liked_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."waitlist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "waitlist_shared_posts" ADD CONSTRAINT "waitlist_shared_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."waitlist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "waitlist" ADD CONSTRAINT "waitlist_referred_by_id_waitlist_id_fk" FOREIGN KEY ("referred_by_id") REFERENCES "public"."waitlist"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "referral_settings_milestones" ADD CONSTRAINT "referral_settings_milestones_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "referral_settings_milestones" ADD CONSTRAINT "referral_settings_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."referral_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "referral_settings_tasks" ADD CONSTRAINT "referral_settings_tasks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."referral_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_waitlist_order_idx" ON "pages_blocks_waitlist" USING btree ("_order");
  CREATE INDEX "pages_blocks_waitlist_parent_id_idx" ON "pages_blocks_waitlist" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_waitlist_path_idx" ON "pages_blocks_waitlist" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_waitlist_order_idx" ON "_pages_v_blocks_waitlist" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_waitlist_parent_id_idx" ON "_pages_v_blocks_waitlist" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_waitlist_path_idx" ON "_pages_v_blocks_waitlist" USING btree ("_path");
  CREATE INDEX "waitlist_completed_tasks_order_idx" ON "waitlist_completed_tasks" USING btree ("_order");
  CREATE INDEX "waitlist_completed_tasks_parent_id_idx" ON "waitlist_completed_tasks" USING btree ("_parent_id");
  CREATE INDEX "waitlist_read_posts_order_idx" ON "waitlist_read_posts" USING btree ("_order");
  CREATE INDEX "waitlist_read_posts_parent_id_idx" ON "waitlist_read_posts" USING btree ("_parent_id");
  CREATE INDEX "waitlist_liked_posts_order_idx" ON "waitlist_liked_posts" USING btree ("_order");
  CREATE INDEX "waitlist_liked_posts_parent_id_idx" ON "waitlist_liked_posts" USING btree ("_parent_id");
  CREATE INDEX "waitlist_shared_posts_order_idx" ON "waitlist_shared_posts" USING btree ("_order");
  CREATE INDEX "waitlist_shared_posts_parent_id_idx" ON "waitlist_shared_posts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "waitlist_email_idx" ON "waitlist" USING btree ("email");
  CREATE UNIQUE INDEX "waitlist_referral_code_idx" ON "waitlist" USING btree ("referral_code");
  CREATE INDEX "waitlist_referred_by_idx" ON "waitlist" USING btree ("referred_by_id");
  CREATE INDEX "waitlist_updated_at_idx" ON "waitlist" USING btree ("updated_at");
  CREATE INDEX "waitlist_created_at_idx" ON "waitlist" USING btree ("created_at");
  CREATE UNIQUE INDEX "colleges_name_idx" ON "colleges" USING btree ("name");
  CREATE INDEX "colleges_updated_at_idx" ON "colleges" USING btree ("updated_at");
  CREATE INDEX "colleges_created_at_idx" ON "colleges" USING btree ("created_at");
  CREATE INDEX "comments_post_idx" ON "comments" USING btree ("post_id");
  CREATE INDEX "comments_updated_at_idx" ON "comments" USING btree ("updated_at");
  CREATE INDEX "comments_created_at_idx" ON "comments" USING btree ("created_at");
  CREATE INDEX "referral_settings_milestones_order_idx" ON "referral_settings_milestones" USING btree ("_order");
  CREATE INDEX "referral_settings_milestones_parent_id_idx" ON "referral_settings_milestones" USING btree ("_parent_id");
  CREATE INDEX "referral_settings_milestones_image_idx" ON "referral_settings_milestones" USING btree ("image_id");
  CREATE INDEX "referral_settings_tasks_order_idx" ON "referral_settings_tasks" USING btree ("_order");
  CREATE INDEX "referral_settings_tasks_parent_id_idx" ON "referral_settings_tasks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "referral_settings_tasks_slug_idx" ON "referral_settings_tasks" USING btree ("slug");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_waitlist_fk" FOREIGN KEY ("waitlist_id") REFERENCES "public"."waitlist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_colleges_fk" FOREIGN KEY ("colleges_id") REFERENCES "public"."colleges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_waitlist_id_idx" ON "payload_locked_documents_rels" USING btree ("waitlist_id");
  CREATE INDEX "payload_locked_documents_rels_colleges_id_idx" ON "payload_locked_documents_rels" USING btree ("colleges_id");
  CREATE INDEX "payload_locked_documents_rels_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("comments_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_waitlist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_waitlist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "waitlist_completed_tasks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "waitlist_read_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "waitlist_liked_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "waitlist_shared_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "waitlist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "colleges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "referral_settings_milestones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "referral_settings_tasks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "referral_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_waitlist" CASCADE;
  DROP TABLE "_pages_v_blocks_waitlist" CASCADE;
  DROP TABLE "waitlist_completed_tasks" CASCADE;
  DROP TABLE "waitlist_read_posts" CASCADE;
  DROP TABLE "waitlist_liked_posts" CASCADE;
  DROP TABLE "waitlist_shared_posts" CASCADE;
  DROP TABLE "waitlist" CASCADE;
  DROP TABLE "colleges" CASCADE;
  DROP TABLE "comments" CASCADE;
  DROP TABLE "referral_settings_milestones" CASCADE;
  DROP TABLE "referral_settings_tasks" CASCADE;
  DROP TABLE "referral_settings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_waitlist_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_colleges_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_comments_fk";
  
  DROP INDEX "payload_locked_documents_rels_waitlist_id_idx";
  DROP INDEX "payload_locked_documents_rels_colleges_id_idx";
  DROP INDEX "payload_locked_documents_rels_comments_id_idx";
  ALTER TABLE "users" DROP COLUMN "enable_a_p_i_key";
  ALTER TABLE "users" DROP COLUMN "api_key";
  ALTER TABLE "users" DROP COLUMN "api_key_index";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "waitlist_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "colleges_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "comments_id";
  DROP TYPE "public"."enum_referral_settings_tasks_verification_type";`)
}
